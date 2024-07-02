'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { DeleteFolderServerSchema, FolderSchema } from '@/schemas/folder';
import { deleteFolder } from '@/services/folders/deleteFolder';

type State = typeof FolderSchema;

export const deleteFolderAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);
  try {
    const payload = validateFormData(formData, DeleteFolderServerSchema);
    const { folder } = await deleteFolder({ ...payload });

    revalidateTag(`folders/isArchive`);
    revalidateTag(`documents/isArchive`);
    revalidateTag(`folders`);
    return handleSuccess(folder);
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
