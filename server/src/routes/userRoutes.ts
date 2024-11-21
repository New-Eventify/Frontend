// src/routes/userRoutes.ts
import express from 'express';
import { register, login, signOut } from '../controllers/userController';

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/signout', signOut); // Add signOut route

export default router;