import { Router } from 'express';
import { create } from '../controllers/eventController';
import { upload } from "../middlewares/fileUpload";


const router = Router();

router.post("/create",  create);

export default router;
