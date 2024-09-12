import { PrismaClient, User } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export interface CreateUserArgs {
  name: string;
  email: string;
}
