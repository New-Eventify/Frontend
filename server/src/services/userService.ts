// src/services/userService.ts
import { prisma } from '../models/prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/token';
import { z } from 'zod';

// Define a schema for validating email
const EmailSchema = z.string().email({ message: "Invalid email address." });

// Define a schema for validating sign-up input
const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  name: z.string().min(1, { message: "Name is required." }),
});

// Refactored signUp function
export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Validate input
    SignUpSchema.parse({ email, password, name });

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email is already registered with another account.");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate a token
    return { token: generateToken(user.id), 
      email: user.email, 
      name: user.name, 
      id: user.id, 
      lastSignInAt: user.lastSignInAt, 
      createdAt: user.createdAt, 
      lastSignOutAt: user.lastSignOutAt 
    };
  } catch (error: any) {
    console.error("Failed to register user", error);
    throw new Error(error.message || "Failed to register user. Please try again later.");
  }
};

// Refactored signIn function
export const signIn = async (email: string, password: string) => {
  try {
    // Validate email format
    const validatedEmail = EmailSchema.parse(email);
    const user = await prisma.user.findUnique({ where: { email: validatedEmail } });
    if (!user) throw new Error('Invalid credentials. User not found.');
  
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials. Password does not match.');
  
    // Update lastSignInAt field
    await prisma.user.update({
      where: { email: validatedEmail },
      data: { lastSignInAt: new Date() }
    });
  
    return { 
      token: generateToken(user.id), 
      user: { 
        email: user.email, 
        name: user.name, 
        id: user.id, 
        lastSignInAt: user.lastSignInAt,
        createdAt: user.createdAt,
        lastSignOutAt: user.lastSignOutAt
      }};
  } catch (error: any) {
    console.error("Failed to sign in user", error);
    throw new Error(error.message || "Failed to sign in user. Please try again later.");
  }
};
