// src/routes/userRoutes.ts
import express from 'express';
import { register, login, signOut } from '../controllers/userController';

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

export default router;