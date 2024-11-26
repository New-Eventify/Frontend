// src/services/registrationService.ts
import { z } from "zod";
import { prisma } from "../models/prisma";

// Zod Schemas
const AdmissionSchema = z.object({
  admissionId: z.string().uuid(),
  quantity: z.number().positive(),
});

const RegistrationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number is required." }),
  eventId: z.string().uuid(),
  admissions: z.array(AdmissionSchema).min(1, { message: "At least one admission is required." }),
});

// Service Functions

/**
 * Register a user for an event.
 * @param registrationData - Registration data to process.
 */
export const registerForEvent = async (registrationData: any) => {
  // Validate the input
  const validatedData = RegistrationSchema.parse(registrationData);

  const { firstName, lastName, email, phoneNumber, eventId, admissions } = validatedData;

  // Check if the event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  // Create the registration
  const registration = await prisma.registration.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      event: { connect: { id: eventId } },
      admissions: {
        create: admissions.map((admission) => ({
          admission: { connect: { id: admission.admissionId } },
          quantity: admission.quantity,
        })),
      },
    },
    include: {
      admissions: {
        include: {
          admission: true,
        },
      },
    },
  });

  return registration;
};
