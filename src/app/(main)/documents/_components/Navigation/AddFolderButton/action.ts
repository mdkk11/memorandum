'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { errors, FetchError } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { CreateFolderServerSchema, FolderSchema } from '@/schemas/folder';
import { createFolder } from '@/services/folders/createFolder';

type State = typeof FolderSchema;

/**
 * @package
 */
export const createFolderAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);
  try {
    const payload = validateFormData(formData, CreateFolderServerSchema);
    const { folder } = await createFolder({ ...payload });
    revalidatePath('/document');
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
