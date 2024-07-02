'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { errors, FetchError } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { DeleteDocumentServerSchema, DocumentSchema } from '@/schemas/document';
import { DeleteFolderServerSchema, FolderSchema } from '@/schemas/folder';
import { deleteDocument } from '@/services/documents/deleteDocument';
import { deleteFolder } from '@/services/folders/deleteFolder';

type DeleteFolderState = typeof FolderSchema;

export const deleteFolderAction = async (prevState: FormState<DeleteFolderState>, formData: FormData): Promise<FormState<DeleteFolderState>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);

  try {
    const payload = validateFormData(formData, DeleteFolderServerSchema);
    const { folder } = await deleteFolder({ ...payload });
    revalidateTag(`folders`);
    revalidateTag(`folders/isArchive`);
    revalidatePath(`/documents/${folder.id}`);

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

type DeleteDocumentState = typeof DocumentSchema;

export const deleteDocumentAction = async (prevState: FormState<DeleteDocumentState>, formData: FormData): Promise<FormState<DeleteDocumentState>> => {
  const session = await getSession();
  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);

  try {
    const payload = validateFormData(formData, DeleteDocumentServerSchema);
    const { document } = await deleteDocument({ ...payload });
    revalidateTag(`folders`);
    revalidateTag(`folders/isArchive`);
    revalidatePath(`/documents/${document.folderId}/${document.id}`);

    return handleSuccess(document);
  } catch (err) {
    console.log(err);

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
