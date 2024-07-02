'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { DeleteDocumentServerSchema, DocumentSchema } from '@/schemas/document';
import { deleteDocument } from '@/services/documents/deleteDocument';

type State = typeof DocumentSchema;

export const deleteDocumentAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);
  try {
    const payload = validateFormData(formData, DeleteDocumentServerSchema);
    const { document } = await deleteDocument({ ...payload });

    revalidatePath('/documents');
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
