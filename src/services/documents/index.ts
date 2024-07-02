import { Prisma } from '@prisma/client';

export type DocumentIncludeFolder = Prisma.DocumentGetPayload<{
  include: { folder: true };
}>;
