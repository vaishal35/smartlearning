// Load Prisma client to communicate with PostgreSQL
import { PrismaClient } from '@prisma/client'

// Instantiate PrismaClient. In a real app you might share this instance
// across the application so that DB connections are pooled efficiently.
export const prisma = new PrismaClient()
