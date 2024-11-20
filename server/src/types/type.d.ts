// src/types/type.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    user?: { id: string; email: string }; // Match the `req.user` structure
  }
}
