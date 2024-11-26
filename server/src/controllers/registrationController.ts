// src/controllers/registrationController.ts
import { Request, Response } from "express";
import logger from "../utils/logger";
import { registerForEvent } from "../services/registrationService";

/**
 * Controller for user registration to an event.
 */
export const createRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phoneNumber, eventId, admissions } = req.body;

    // Process registration
    const registration = await registerForEvent({ firstName, lastName, email, phoneNumber, eventId, admissions });

    res.status(201).json({
      message: "Registration successful.",
      registration,
    });

    logger.info("User registered successfully for event:", registration);
  } catch (error: any) {
    logger.error("Failed to register user for event:", error);
    res.status(400).json({
      error: "Failed to register for event.",
      details: error.message,
    });
  }
};
