'use server';

import { ZodError } from 'zod';
import { hashPassword } from '@/libs/crypt';
import { sendVerificationEmail } from '@/libs/email';
import { errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { generateVerificationToken } from '@/libs/token';
import { transformFiledErrors, validateFormData } from '@/libs/utils';
import { AuthSchema, SignUpSchema } from '@/schemas/auth';
import { deleteVerificationToken } from '@/services/token/email/deleteVerificationToken';
import { getVerificationToken } from '@/services/token/email/getVerificationToken';
import { createUser } from '@/services/user/createUser';
import { getUserByCredentials } from '@/services/user/getUser';

type State = typeof AuthSchema;

export async function signUpAction(prevState: FormState<State>, formData: FormData): Promise<FormState<State>> {
  try {
    const { name, email, password } = validateFormData(formData, SignUpSchema);

    const { user } = await getUserByCredentials({ email });
    if (user) {
      return handleError(prevState, errors[409]);
    }

    const hashedPassword = await hashPassword(password!);
    await createUser({ name, email, password: hashedPassword });
    const { verificationToken } = await generateVerificationToken({ email });
    await sendVerificationEmail(name, verificationToken.email, verificationToken.token);
    return handleSuccess({});
  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFiledErrors(err),
      });
    }

    return handleError(prevState, errors[500]);
  }
}

export async function checkVerificationToken(formData: FormData): Promise<{ email: string } | null> {
  const { name, email } = validateFormData(formData, SignUpSchema);
  const { verificationToken } = await getVerificationToken({ email });

  if (verificationToken) {
    await deleteVerificationToken({ id: verificationToken.id });
    await sendVerificationEmail(name, verificationToken.email, verificationToken.token);
    return { email };
  }
  return null;
}
