import { PrismaClient } from '@prisma/client';
import { folders } from '../../../mocks';
import { createUserId } from '../../../mocks/user';

export const folderData = ({ prisma }: { prisma: PrismaClient }) => [...folders({ prisma, authorId: createUserId(0), length: 10, isArchive: false })];
