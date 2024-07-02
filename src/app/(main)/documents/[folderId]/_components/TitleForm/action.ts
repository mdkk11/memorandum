'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { FolderSchema, UpdateFolderServerSchema } from '@/schemas/folder';
import { updateFolder } from '@/services/folders/updateFolder';

type State = typeof FolderSchema;

/**
 * @package
 */
export async function updateFolderTitle(prevState: FormState<State>, formData: FormData): Promise<FormState<State>> {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);

  try {
    const { id, title, authorId } = validateFormData(formData, UpdateFolderServerSchema);

    const { folder } = await updateFolder({ id, title, authorId, updatedAt: new Date() });
    revalidatePath(`/documents/${folder.id}`);
    revalidateTag(`folders/${folder.id}`);
    revalidateTag(`folders`);
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
}
