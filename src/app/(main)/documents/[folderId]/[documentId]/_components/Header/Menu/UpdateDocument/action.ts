'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { updateDocumentsIndex } from '@/app/(main)/documents/_components/Navigation/FolderList/action';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { UpdateDocumentSchema } from '@/schemas/document';
import { updateDocument } from '@/services/documents/updateDocument';
import { getFolderById } from '@/services/folders/getFolderById';

type State = typeof UpdateDocumentSchema;

// アーカイブにする
export const updateDocumentAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);
  try {
    const { id, folderId } = validateFormData(formData, UpdateDocumentSchema);
    const { document } = await updateDocument({ id, folderId, isArchive: true, authorId: session.user.id, updatedAt: new Date() });
    const { folder } = await getFolderById({ folderId, authorId: session.user.id });
    await updateDocumentsIndex(folder.documents, folderId);
    revalidateTag(`documents`);
    revalidateTag(`documents/${document.folderId}/${document.id}`);

    return handleSuccess(document);
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
