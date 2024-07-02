import { PrismaClient } from '@prisma/client';
import { createFolderId, createUserId, documents } from '../../../mocks';

export const documentData = ({ prisma }: { prisma: PrismaClient }) => [
  ...documents({ prisma, authorId: createUserId(0), folderId: createFolderId(0), length: 5, isArchive: false }),
  ...documents({ prisma, authorId: createUserId(0), folderId: createFolderId(1), length: 5, isArchive: true }),
  ...documents({ prisma, authorId: createUserId(0), folderId: createFolderId(3), length: 5, isArchive: false }),
];
