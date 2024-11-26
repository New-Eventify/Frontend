import { Router } from "express";
import { createRegistration } from "../controllers/registrationController";

const router = Router();

router.post("/create", createRegistration);

export default router;
