// src/utils/token.ts
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwtSecret);
};