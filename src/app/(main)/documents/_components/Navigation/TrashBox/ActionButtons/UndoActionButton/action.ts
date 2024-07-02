'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { UpdateDocumentServerSchema } from '@/schemas/document';
import { UpdateFolderSchema, UpdateFolderServerSchema } from '@/schemas/folder';
import { updateDocument } from '@/services/documents/updateDocument';
import { getAllFolders } from '@/services/folders/getAllFolders';
import { getFolderById } from '@/services/folders/getFolderById';
import { updateFolder } from '@/services/folders/updateFolder';

type UpdateFolderState = typeof UpdateFolderSchema;

export const updateFolderAction = async (prevState: FormState<UpdateFolderState>, formData: FormData): Promise<FormState<UpdateFolderState>> => {
  const session = await getSession();
  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);

  try {
    const { id, authorId, ...payload } = validateFormData(formData, UpdateFolderServerSchema);
    const { folders } = await getAllFolders({ authorId });
    const { folder } = await updateFolder({ ...payload, id, authorId, index: folders.length + 1, isArchive: false });

    revalidateTag(`folders`);
    revalidateTag(`folders/isArchive`);
    revalidateTag(`folders/navigation`);
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

type UpdateDocumentState = typeof UpdateFolderSchema;

export const updateDocumentAction = async (prevState: FormState<UpdateDocumentState>, formData: FormData): Promise<FormState<UpdateDocumentState>> => {
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

    revalidateTag(`folders/${document.id}`);
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
