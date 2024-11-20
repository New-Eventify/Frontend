// src/services/eventService.ts
import { prisma } from '../models/prisma';

export const createEvent = async (name: string, description: string, date: Date, userId: string, imageUrl: string) => {
  const event = await prisma.event.create({
    data: {
      name,
      description,
      date,
      userId,
      imageUrl,
    },
  });
  return event;
};
