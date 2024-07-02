'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from '@/libs/auth';
import { FetchError, errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { CreateDocumentSchema, DocumentSchema } from '@/schemas/document';
import { createDocument } from '@/services/documents/createDocument';

type State = typeof DocumentSchema;

export const addDocumentAction = async (prevState: FormState<State>, formData: FormData): Promise<FormState<State>> => {
  const session = await getSession();

  if (!session) {
    return handleError(prevState, errors[401]);
  }
  formData.append('authorId', session.user.id);

  try {
    const payload = validateFormData(formData, CreateDocumentSchema);
    const { document } = await createDocument({ ...payload, authorId: session.user.id });

    revalidateTag(`folders`);
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
