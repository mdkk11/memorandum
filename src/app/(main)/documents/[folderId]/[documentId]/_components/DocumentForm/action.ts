'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { DocumentSchema, UpdateDocumentServerSchema } from '@/schemas/document';
import { FetchError } from '@/services';
import { updateDocument } from '@/services/documents/updateDocument';

type State = typeof DocumentSchema;

export const updateDocumentContentAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }

  formData.append('authorId', session.user.id);

  try {
    const { authorId, ...payload } = validateFormData(formData, UpdateDocumentServerSchema);
    const { document } = await updateDocument({ ...payload, authorId, updatedAt: new Date() });

    revalidateTag(`documents/${document.id}`);

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
