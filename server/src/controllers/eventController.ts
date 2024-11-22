import { Request, Response, NextFunction } from "express";
import { createEvent } from "../services/eventService";
import { authenticate } from "../middlewares/authMiddleware";
import logger from "../utils/logger";
import { uploadToSupabase } from "../utils/supabaseUploader";
import { upload } from "../middlewares/fileUpload";

interface CustomRequest extends Request {
  user?: { id: string; email: string };
}

export const create = [
  upload.single("image"), // Use Multer middleware to parse `form-data`
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    authenticate(req, res, async () => {
      const { name, description, date } = req.body;

      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      try {
        // Handle file upload
        let imageUrl = null;

        if (req.file) {
          imageUrl = await uploadToSupabase(req.file.buffer, req.file.originalname, "event-images");
        }

        // Call service to create the event
        const event = await createEvent(name, description, new Date(date), req.user.id, imageUrl);

        res.status(201).json({ event });
        logger.info("Event created successfully");
      } catch (err: any) {
        logger.error("Failed to create event", err);
        res.status(500).json({ error: "Failed to create event", details: err.message });
      }
    });
  },
];
