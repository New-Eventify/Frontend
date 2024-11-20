import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import logger from '../utils/logger';

interface CustomRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string };
    req.user = decoded; // Attach user info to the request
    logger.info('User authenticated successfully');
    next();
  } catch (err) {
    logger.error('Failed to authenticate user', err);
    res.status(403).json({ error: 'Forbidden' });
  }
};
