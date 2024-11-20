// src/services/userService.ts
import { prisma } from '../models/prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/token';

export const signUp = async (email: string, password: string, name: string) => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  return { token: generateToken(user.id), user };
};

export const signIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return { token: generateToken(user.id), user };
};

