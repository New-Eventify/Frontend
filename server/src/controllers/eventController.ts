import { Request, Response, NextFunction } from 'express';
import { createEvent } from "../services/eventService";
import { authenticate } from '../middlewares/authMiddleware';
import logger from '../utils/logger';

// Extend the Request type to include the `user` property
interface CustomRequest extends Request {
    user?: { id: string; email: string };
  }
  

export const create = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    authenticate(req, res, async () => {
        const { name, description, date, imageUrl } = req.body;

        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        try {
            const event = await createEvent(
                name,
                description,
                new Date(date),
                req.user.id,
                imageUrl
            );
            res.status(201).json({ event });
            logger.info('Event created successfully');
        } catch (err: any) {
            logger.error('Failed to create event', err);
            res.status(500).json({ error: 'Failed to create event', details: err.message });
        }
    })
};

