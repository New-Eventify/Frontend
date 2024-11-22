// src/controllers/userController.ts
import { Request, Response } from "express";
import { signUp, signIn } from "../services/userService";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import { blacklistToken } from "../services/authService";
import { authenticate } from "../middlewares/authMiddleware";
import { isTokenBlacklisted } from "../middlewares/checkBlacklist";
import { prisma } from "../models/prisma";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const result = await signUp(email, password, name);
    res.status(201).json(result);
    logger.info("User registered successfully");
  } catch (error: any) {
    let formattedError;

    // Handle validation errors (Zod or similar)
    if (Array.isArray(error?.issues)) {
      formattedError = error.issues.map((issue: any) => ({
        validation: issue.path[0],
        code: issue.code,
        message: issue.message,
        path: issue.path,
      }))[0]; // Select the first issue for the response
    } else {
      // For generic errors
      formattedError = {
        validation: "generic",
        code: "unknown_error",
        message: error.message || "An error occurred.",
      };
    }

    // Log the full error
    logger.error("Failed to register user", error);

    // Return structured error response
    res.status(400).json(formattedError);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    res.status(200).json(result);
    logger.info("User logged in successfully");
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
    logger.error("Failed to log in user", error);
  }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  authenticate(req, res, async () => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).json({ error: "Token is required to sign out" });
      return;
    }

    try {
      // Check if the token is already blacklisted
      const isBlacklisted = await isTokenBlacklisted(token);
      if (isBlacklisted) {
        res.status(400).json({ error: "Token is already blacklisted" });
        return;
      }

      const decodedToken: any = jwt.decode(token);
      if (!decodedToken || !decodedToken.exp) {
        res.status(400).json({ error: "Invalid token" });
        return;
      }

      // Update lastSignOutAt field
      if (req.user) {
        await prisma.user.update({
          where: { id: req.user.id },
          data: { lastSignOutAt: new Date() },
        });
      }

      const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000); // Remaining lifespan in seconds
      if (expiresIn > 0) {
        await blacklistToken(token, expiresIn);
      }

      res.status(200).json({ message: "Successfully signed out" });
      logger.info("User signed out successfully, token blacklisted");
    } catch (err: any) {
      logger.error("Failed to sign out", err);
      res
        .status(500)
        .json({ error: "Failed to sign out", details: err.message });
    }
  });
};
