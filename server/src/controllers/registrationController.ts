import { Request, Response } from "express";
import { registerForEvent } from "../services/registrationService";
import logger from "../utils/logger";

interface CustomRequest extends Request {
    user?: { id: string; email: string };
  }

export const register = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phoneNumber, admissionId, eventId } = req.body;

    const registration = await registerForEvent({
      firstName,
      lastName,
      email,
      phoneNumber,
      admissionId,
      eventId,
    });

    res.status(201).json({ registration });
    logger.info("User registered successfully for event:", eventId);
  } catch (err: any) {
    logger.error("Failed to register for event:", err);
    res.status(400).json({ error: "Failed to register for event", details: err.message });
  }
};
