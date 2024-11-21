import { Router } from 'express';
import { create } from '../controllers/eventController';

const router = Router();

router.post('/create', create);

export default router;
