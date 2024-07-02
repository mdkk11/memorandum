'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { errors, FetchError } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { DocumentSchema, UpdateDocumentServerSchema } from '@/schemas/document';
import { updateDocument } from '@/services/documents/updateDocument';
import { getAllFolders } from '@/services/folders/getAllFolders';
import { getFolderById } from '@/services/folders/getFolderById';
import { updateFolder } from '@/services/folders/updateFolder';

type State = typeof DocumentSchema;

// アーカイブ状態を戻す(isArchive=false)
export const updateDocumentAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);

  try {
    const { authorId, folderId, ...payload } = validateFormData(formData, UpdateDocumentServerSchema);
    const [{ folders }, { folder }] = await Promise.all([getAllFolders({ authorId }), getFolderById({ authorId, folderId })]);

    const { document } = await updateDocument({ ...payload, folderId, authorId, index: folder.documents.length + 1, isArchive: false, updatedAt: new Date() });
    if (document.folder.isArchive) {
      const { folder } = await updateFolder({ authorId, id: document.folderId, index: folders.length + 1, isArchive: false });
      revalidateTag(`folders/${folder.id}`);
    }
    revalidateTag(`folders/${document.folderId}`);
    revalidatePath(`/documents/${document.folderId}/${document.id}`);

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
