import { z } from "zod";
import { prisma } from "../models/prisma";

const RegistrationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
  admissionId: z.string().uuid({ message: "Invalid admission ID" }),
  eventId: z.string().uuid({ message: "Invalid event ID" }),
});

export const registerForEvent = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  admissionId: string;
  eventId: string;
}) => {
  const validatedData = RegistrationSchema.parse(data);

  // Create registration
  const registration = await prisma.registration.create({
    data: validatedData,
  });

  return registration;
};
