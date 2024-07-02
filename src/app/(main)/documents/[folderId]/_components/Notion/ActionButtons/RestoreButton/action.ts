'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { errors, FetchError } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { UpdateFolderSchema, UpdateFolderServerSchema } from '@/schemas/folder';
import { updateDocument } from '@/services/documents/updateDocument';
import { getAllFolders } from '@/services/folders/getAllFolders';
import { updateFolder } from '@/services/folders/updateFolder';

type State = typeof UpdateFolderSchema;

// アーカイブ状態を戻す(isArchive=false)
export const updateFolderAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);

  try {
    const { authorId, ...payload } = validateFormData(formData, UpdateFolderServerSchema);
    const { folders } = await getAllFolders({ authorId });
    const { folder } = await updateFolder({ ...payload, authorId, index: folders.length + 1, isArchive: false, updatedAt: new Date() });
    if (folder.documents.length > 0) {
      Promise.all(
        folder.documents.map(async (document) => {
          const { id, folderId } = document;
          await updateDocument({ id, folderId, authorId: session.user.id, isArchive: false });
          revalidateTag(`documents/${id}`);
        })
      );
    }
    revalidateTag(`folders/isArchive`);
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
