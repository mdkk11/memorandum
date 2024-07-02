import { Folder, PrismaClient, PrismaPromise } from '@prisma/client';

export const createFolderId = (i: number) => `550e8400-e29b-41d4-a716-44665544000${i}`;

type Props = { length: number } & Pick<Folder, 'authorId' | 'isArchive'>;

export const foldersFixture = ({ length, authorId, isArchive }: Props): Omit<Folder, 'createdAt' | 'updatedAt'>[] => {
  return [...new Array(length)].map((_, i) => ({
    id: createFolderId(i),
    title: `Folder ${i + 1}`,
    index: i + 1,
    isArchive,
    authorId,
  }));
};

export const folders = ({ length, authorId, isArchive, prisma }: Props & { prisma: PrismaClient }) => {
  const folders: PrismaPromise<Folder>[] = [];
  for (const data of foldersFixture({ length, isArchive, authorId })) {
    const folder = prisma.folder.create({ data: { ...data } });
    folders.push(folder);
  }
  return folders;
};
