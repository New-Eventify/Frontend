// src/controllers/userController.ts
import { Request, Response } from 'express';
import { signUp, signIn } from '../services/userService';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import { blacklistToken } from '../services/authService';
import { authenticate } from '../middlewares/authMiddleware';
import {  isTokenBlacklisted } from '../middlewares/checkBlacklist';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const result = await signUp(email, password, name);
    res.status(201).json(result);
    logger.info('User registered successfully');
  } catch (error: Error | any) {
    logger.error('Failed to register user', error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    res.status(200).json(result);
    logger.info('User logged in successfully');
  } catch (error: Error | any) {
    logger.error('Failed to log in user', error);
    res.status(400).json({ error: error.message });
  }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  authenticate(req, res, async () => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(400).json({ error: 'Token is required to sign out' });
      return;
    }

    try {
      // Check if the token is already blacklisted
      const isBlacklisted = await isTokenBlacklisted(token);
      if (isBlacklisted) {
        res.status(400).json({ error: 'Token is already blacklisted' });
        return;
      }

      const decodedToken: any = jwt.decode(token);
      if (!decodedToken || !decodedToken.exp) {
        res.status(400).json({ error: 'Invalid token' });
        return;
      }

      const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000); // Remaining lifespan in seconds
      if (expiresIn > 0) {
        await blacklistToken(token, expiresIn);
      }

      res.status(200).json({ message: 'Successfully signed out' });
      logger.info('User signed out successfully, token blacklisted');
    } catch (err: any) {
      logger.error('Failed to sign out', err);
      res.status(500).json({ error: 'Failed to sign out', details: err.message });
    }
  });
};