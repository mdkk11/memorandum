import type { PrismaPromise, Document, PrismaClient } from '@prisma/client';

type Props = { length: number } & Pick<Document, 'authorId' | 'folderId' | 'isArchive'>;

export const documentsFixture = ({ length, authorId, folderId, isArchive }: Props): Omit<Document, 'id' | 'createdAt' | 'updatedAt'>[] => {
  return [...new Array(length)].map((_, i) => ({
    title: `Document ${i + 1}`,
    body: 'Document Body',
    index: i + 1,
    isArchive,
    folderId,
    authorId,
  }));
};

export const documents = ({ length, authorId, folderId, isArchive, prisma }: Props & { prisma: PrismaClient }) => {
  const documents: PrismaPromise<Document>[] = [];
  for (const data of documentsFixture({ length, authorId, folderId, isArchive })) {
    const document = prisma.document.create({ data: { ...data } });
    documents.push(document);
  }
  return documents;
};
