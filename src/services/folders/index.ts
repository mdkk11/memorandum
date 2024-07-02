import { Prisma } from '@prisma/client';

export type FolderIncludeDocuments = Prisma.FolderGetPayload<{
  include: { documents: true };
}>;

export type DocumentIncludeFolder = Prisma.DocumentGetPayload<{
  include: { folder: true };
}>;

export type FoldersWithDocumentsCount = Prisma.FolderGetPayload<{
  include: {
    _count: {
      select: {
        documents: true;
      };
    };
  };
}>;
