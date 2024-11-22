import { prisma } from "../models/prisma";
import { z } from "zod";

const EventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  description: z.string().optional(),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "Event date must be in the future",
  }),
  userId: z.string().uuid(),
  imageUrl: z.string().url().optional(),
});

export const createEvent = async (
  name: string,
  description: string,
  date: Date,
  userId: string,
  imageUrl: string | null
) => {
  // Validate input
  const validatedData = EventSchema.parse({ name, description, date, userId, imageUrl });

  // Create the event in the database
  const event = await prisma.event.create({
    data: validatedData,
  });

  return event;
};
