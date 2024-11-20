// server/src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  const status = err instanceof SyntaxError ? 400 : 500;
  res.status(status).json({ error: err.message });
};

export default errorHandler;

// Usage example

// In your server/index.ts file, you can use the errorHandler middleware as follows:

