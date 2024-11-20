import { Request, Response, NextFunction } from 'express';
import redisClient from '../utils/redisClient';

// server/src/middlewares/checkBlacklist.ts
export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    return isBlacklisted !== null;
  }
