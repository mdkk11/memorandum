'use server';

import { Document } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { getSession } from '@/libs/auth';
import { errors } from '@/libs/errors';
import { updateDocument } from '@/services/documents/updateDocument';
import { FolderIncludeDocuments } from '@/services/folders';
import { updateFolder } from '@/services/folders/updateFolder';

type Error = { message: string; status: number };

/**
 * @package
 */
export type FormState = {
  error: Error | null;
};

export const handleError = (error: Error): FormState => {
  return { error };
};

export const updateFoldersIndex = async (folders: FolderIncludeDocuments[], folderId: string) => {
  const session = await getSession();
  if (!session) {
    return handleError(errors[401]);
  }

  try {
    await Promise.all(
      folders.map(async (folder, i) => {
        const { id } = folder;
        const payload = { id, index: i + 1, authorId: session.user.id };
        // 変更されたフォルダのみupdatedAtを更新する
        await updateFolder(id === folderId ? { ...payload, updatedAt: new Date() } : payload);
      })
    );
    revalidateTag('folders');
  } catch (error) {
    console.error(error);
    return handleError(errors[500]);
  }
};

export const updateDocumentsIndex = async (documents: Document[], folderId: string) => {
  const session = await getSession();
  if (!session) {
    return handleError(errors[401]);
  }
  try {
    await Promise.all(
      documents.map(async (document, i) => {
        const { id, folderId } = document;
        return updateDocument({ id, folderId, authorId: session.user.id, index: i + 1 });
      })
    );
    revalidateTag(`folders/${folderId}`);
  } catch (error) {
    console.error(error);
    return handleError(errors[500]);
  }
};
