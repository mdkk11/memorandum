import { PrismaClient } from '@prisma/client';
import { users } from '../../../mocks';

export const userData = async ({ prisma }: { prisma: PrismaClient }) => [...(await users({ prisma }))];
