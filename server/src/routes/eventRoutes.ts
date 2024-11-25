import { Router } from "express";
import { create, getEventsByUserId, update, deleteEventById } from "../controllers/eventController";
import { upload } from "../middlewares/fileUpload";

const router = Router();

// Route for creating an event
router.post("/create", create);

// Route for fetching events by userId
router.get("/:user", getEventsByUserId); // New route for fetching user-specific events

router.put("/update/:id", update); // New route for updating events

// Delete event
router.delete("/delete/:eventId", deleteEventById);

export default router;
