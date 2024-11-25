import { z } from "zod";
import { prisma } from "../models/prisma";
import { Session, Venue, Prisma, Ticket } from "@prisma/client";

// Schema for Admissions
const AdmissionSchema = z.object({
  name: z.string().min(1, { message: "Admission name is required" }),
  price: z.number().nonnegative(),
});

// Updated Ticket schema to include admissions
const TicketSchema = z.object({
  status: z.boolean(),
  number_of_tickets: z.number().nonnegative(),
  admissions: z.array(AdmissionSchema), // Validating nested admissions
});

// Schema for a session
const SessionSchema = z.object({
  start_date: z.coerce.date(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
});

// Schema for venue
const VenueSchema = z.object({
  location: z.enum(["on-site", "online"]),
  address: z.string().optional(),
  meeting_link: z.string().optional(),
});

// Main event schema
const EventSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  event_category: z.string().min(1, { message: "Event category is required" }),
  event_type: z.enum(["one-time", "recurring"]),
  sessions: z.array(SessionSchema),
  venue: VenueSchema,
  description: z.string().optional(),
  image: z.string().optional(),
  tickets: z.array(TicketSchema).optional(), // Allow events without tickets
});

// Validation schema for userId
const UserIdSchema = z.string().uuid({ message: "Invalid userId format" });

const UpdateEventSchema = z.object({
  title: z.string().min(1).optional(),
  event_category: z.string().min(1).optional(),
  event_type: z.enum(["one-time", "recurring"]).optional(),
  sessions: z
    .array(
      z.object({
        start_date: z.coerce.date(),
        start_time: z.coerce.date(),
        end_time: z.coerce.date(),
      })
    )
    .optional(),
  venue: z
    .object({
      location: z.enum(["on-site", "online"]).optional(),
      address: z.string().optional(),
      meeting_link: z.string().optional(),
    })
    .optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  tickets: z
    .array(
      z.object({
        status: z.boolean().optional(),
        number_of_tickets: z.number().nonnegative().optional(),
        admissions: z
          .array(
            z.object({
              name: z.string().min(1).optional(),
              price: z.number().nonnegative().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
});

// Create Event Function
export const createEvent = async (
  title: string,
  eventCategory: string,
  eventType: string,
  sessions: Session[],
  venue: Venue,
  description: string | null,
  image: string | null,
  tickets: Ticket[] | null, // Allow tickets to be optional
  userId: string
) => {
  // Validate input data
  const validatedData = EventSchema.parse({
    title,
    event_category: eventCategory,
    event_type: eventType,
    sessions,
    venue,
    description,
    image,
    tickets: tickets ?? [], // Default to an empty array if no tickets are provided
  });

  // Map session data to Prisma-compatible structure
  const sessionData = validatedData.sessions.map((session) => ({
    startDate: session.start_date,
    startTime: session.start_time,
    endTime: session.end_time,
  }));

  // Map ticket and admissions data
  const ticketData = validatedData.tickets?.map((ticket) => ({
    status: ticket.status,
    numberOfTickets: ticket.number_of_tickets,
    admissions: {
      create: ticket.admissions.map((admission) => ({
        name: admission.name,
        price: admission.price,
      })),
    },
  }));

  // Save the event to the database
  const event = await prisma.event.create({
    data: {
      title: validatedData.title,
      eventCategory: validatedData.event_category,
      eventType: validatedData.event_type,
      description: validatedData.description ?? undefined,
      imageUrl: validatedData.image ?? undefined,
      user: { connect: { id: userId } }, // Connect event to user
      session: { create: sessionData }, // Create nested sessions
      venue: { create: validatedData.venue }, // Create nested venue
      tickets: ticketData ? { create: ticketData } : undefined, // Conditionally create tickets
    },
    include: {
      venue: true,
      session: true,
      tickets: {
        include: {
          admissions: true,
        },
      },
    },
  });

  return event;
};

// Fetch Events By UserId Function
export const fetchEventsByUserId = async (userId: string) => {
  // Validate userId
  UserIdSchema.parse(userId);

  try {
    // Query database for events associated with the provided userId
    const events = await prisma.event.findMany({
      where: {
        userId: userId, // Assuming the field linking events to users is called "userId"
      },
      include: {
        venue: true,
        session: true,
        tickets: {
          include: {
            admissions: true,
          },
        },
      },
    });

    if (events.length === 0) {
      throw new Error("No events found for the provided userId.");
    }

    return events;
  } catch (error: any) {
    throw new Error(`Error fetching events for userId ${userId}: ${error.message}`);
  }
};



export const updateEvent = async (eventId: string, data: any, userId: string) => {
  // Validate input
  const validatedData = UpdateEventSchema.parse(data);

  // Check if the event exists and belongs to the user
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { user: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.userId !== userId) {
    throw new Error("Unauthorized to update this event");
  }

  // Start handling nested deletions before the update
  // Step 1: Delete related admissions
  await prisma.admission.deleteMany({
    where: {
      ticket: {
        eventId,
      },
    },
  });

  // Step 2: Delete related tickets
  await prisma.ticket.deleteMany({
    where: {
      eventId,
    },
  });

  // Step 3: Delete related sessions
  await prisma.session.deleteMany({
    where: {
      eventId,
    },
  });

  // Step 4: Update the event (now safe to update nested data)
  const prismaData = {
    title: validatedData.title,
    eventCategory: validatedData.event_category,
    eventType: validatedData.event_type,
    description: validatedData.description,
    imageUrl: validatedData.image,
    venue: validatedData.venue
      ? {
          update: {
            location: validatedData.venue.location,
            address: validatedData.venue.address,
            meetingLink: validatedData.venue.meeting_link,
          },
        }
      : undefined,
    session: validatedData.sessions
      ? {
          create: validatedData.sessions.map((session: any) => ({
            startDate: session.start_date,
            startTime: session.start_time,
            endTime: session.end_time,
          })),
        }
      : undefined,
    tickets: validatedData.tickets
      ? {
          create: validatedData.tickets.map((ticket: any) => ({
            status: ticket.status,
            numberOfTickets: ticket.number_of_tickets,
            admissions: {
              create: ticket.admissions?.map((admission: any) => ({
                name: admission.name,
                price: admission.price,
              })),
            },
          })),
        }
      : undefined,
  };

  // Update the event
  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: prismaData,
    include: {
      session: true,
      venue: true,
      tickets: {
        include: { admissions: true },
      },
    },
  });

  return updatedEvent;
};

// Validation schema for the delete request
const DeleteEventSchema = z.object({
  eventId: z.string().uuid({ message: "Invalid event ID format" }),
});

export const deleteEvent = async (eventId: string, userId: string) => {
  // Validate input
  DeleteEventSchema.parse({ eventId });

  // Delete event
  const deletedEvent = await prisma.event.deleteMany({
    where: {
      id: eventId,
      userId: userId, // Ensure the user owns the event
    },
  });

  if (deletedEvent.count === 0) {
    throw new Error("Event not found or not authorized to delete");
  }

  return { message: "Event deleted successfully" };
};
