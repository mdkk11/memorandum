'use server';

import { AuthError } from 'next-auth';
import { ZodError, z } from 'zod';
import { signIn } from '@/libs/auth';
import { errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { AuthSchema } from '@/schemas/auth';

const schema = z.object({
  password: z.string(),
  email: z.string().email().optional(),
});
type State = typeof schema;

export async function signInAction(prevState: FormState<State>, formData: FormData): Promise<FormState<State>> {
  try {
    const { email, password } = validateFormData(formData, AuthSchema);
    await signIn('credentials', { email, password, redirect: false });
    return handleSuccess({ email, password });
  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFiledErrors(err),
      });
    }
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return handleError(prevState, errors[401]);
        default:
          return handleError(prevState, errors[500]);
      }
    }
    throw err;
  }
}
