import { Request, Response, NextFunction } from "express";
import { 
    createEvent, 
    fetchEventsByUserId, 
    updateEvent,
    deleteEvent
} from "../services/eventService"; // Import the new service
import { authenticate } from "../middlewares/authMiddleware";
import logger from "../utils/logger";

interface CustomRequest extends Request {
  user?: { id: string; email: string };
}

// Controller for creating an event
export const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  authenticate(req, res, async () => {
    const { title, event_category, event_type, description, imageUrl } = req.body;

    logger.info("Incoming request to create event:", req.body);

    console.log("Request body:", req.body);

    // Parse JSON fields
    const sessions = req.body.sessions; // Array of session objects
    const venue = req.body.venue;
    const tickets = req.body.tickets; // Array of ticket objects

    // Validate required fields
    if (!title || !event_category || !event_type || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title, event_category, imageUrl or event_type." });
    }

    // Venue Validation
    logger.info("Venue details before validation:", venue);

    if (!["on-site", "online"].includes(venue.location?.trim())) {
      return res
        .status(400)
        .json({ error: "Invalid venue location. Must be 'on-site' or 'online'." });
    }

    if (venue.location === "on-site" && (!venue.address || venue.address.trim() === "")) {
      return res.status(400).json({ error: "Address is required for 'on-site' events." });
    }

    if (venue.location === "online" && (!venue.meetingLink || venue.meetingLink.trim() === "")) {
      return res.status(400).json({ error: "Meeting link is required for 'online' events." });
    }

    // Validate sessions array
    if (!Array.isArray(sessions) || sessions.length === 0) {
      return res.status(400).json({ error: "At least one session is required." });
    }

    // Validate user authentication
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    try {
      // Call service to create the event
      const event = await createEvent(
        title,
        event_category,
        event_type,
        sessions,
        venue,
        description || null,
        imageUrl,
        tickets,
        req.user.id // Pass userId from the authenticated user
      );

      res.status(201).json({ event });
      logger.info("Event created successfully:", event);
    } catch (err: any) {
      logger.error("Failed to create event:", err);

      res.status(500).json({
        error: "Failed to create event",
        details: err.message,
      });
    }
  });
};

// Controller for fetching events by userId
export const getEventsByUserId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  authenticate(req, res, async () => {
    try {
      // Validate user authentication
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
      }

      const userId = req.user.id; // Retrieve userId from the authenticated user

      logger.info(`Fetching events for userId: ${userId}`);

      // Call service to fetch events by userId
      const events = await fetchEventsByUserId(userId);

      res.status(200).json({ events });
      logger.info("Events fetched successfully:", events);
    } catch (err: any) {
      logger.error("Failed to fetch events by userId:", err);

      res.status(500).json({
        error: "Failed to fetch events",
        details: err.message,
      });
    }
  });
};

export const update = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    authenticate(req, res, async () => {
      const { id } = req.params; // Extract event ID from the request parameters
      const data = req.body; // Extract data to update from the request body
  
      // Validate user authentication
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
      }
  
      try {
        // Call the service to update the event
        const updatedEvent = await updateEvent(id, data, req.user.id);
  
        res.status(200).json({ event: updatedEvent });
        logger.info("Event updated successfully:", updatedEvent);
      } catch (err: any) {
        logger.error("Failed to update event:", err);
        res.status(500).json({
          error: "Failed to update event",
          details: err.message,
        });
      }
    });
};

export const deleteEventById = async (req: CustomRequest, res: Response): Promise<void> => {
    authenticate(req, res, async () => {
      const { eventId } = req.params;
  
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized. Please log in." });
        return;
      }
  
      try {
        const result = await deleteEvent(eventId, req.user.id); // Ensure user ownership
        res.status(200).json(result);
        logger.info("Event deleted successfully", result);
      } catch (err: any) {
        logger.error("Failed to delete event", err);
        res.status(500).json({ error: "Failed to delete event", details: err.message });
      }
    });
};
