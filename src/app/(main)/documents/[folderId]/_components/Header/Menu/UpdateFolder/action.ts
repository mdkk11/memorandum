'use server';

import { revalidateTag } from 'next/cache';
import { ZodError, z } from 'zod';
import { updateFoldersIndex } from '@/app/(main)/documents/_components/Navigation/FolderList/action';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { UpdateFolderSchema } from '@/schemas/folder';
import { updateDocument } from '@/services/documents/updateDocument';
import { getAllFolders } from '@/services/folders/getAllFolders';
import { updateFolder } from '@/services/folders/updateFolder';

type State = typeof UpdateFolderSchema;

// アーカイブにする(isArchive=true)
export const updateFolderAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  try {
    const payload = validateFormData(formData, z.object({ id: z.string() }));
    const { folder } = await updateFolder({ ...payload, isArchive: true, authorId: session.user.id, updatedAt: new Date() });
    if (folder.documents.length > 0) {
      Promise.all(
        folder.documents.map(async (document) => {
          const { id, folderId } = document;
          await updateDocument({ id, folderId, authorId: session.user.id, isArchive: true });
          revalidateTag(`documents/${id}`);
        })
      );
    }
    const { folders } = await getAllFolders({ authorId: session.user.id });
    await updateFoldersIndex(folders, folder.id);

    revalidateTag(`folders`);
    revalidateTag(`folders/isArchive`);
    revalidateTag(`documents/isArchive`);
    revalidateTag(`folders/${folder.id}`);
    return handleSuccess(folder);
  } catch (err) {
    if (err instanceof FetchError) {
      return handleError(prevState, {
        message: err.message,
        status: err.status,
      });
    }
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFiledErrors(err),
      });
    }
    return handleError(prevState, errors[500]);
  }
};
