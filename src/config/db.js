// import { PrismaClient } from '@prisma/client';

// export const prisma = new PrismaClient();

// export const connectDB = async () => {
//   // Prisma connects automatically on first query, but we can ensure it's ready
//   await prisma.$connect();
// };

// export const disconnectDB = async () => {
//   await prisma.$disconnect();
// };

import { PrismaClient } from '../generated/client.ts';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  await prisma.$connect();
  console.log("Database connected");
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};