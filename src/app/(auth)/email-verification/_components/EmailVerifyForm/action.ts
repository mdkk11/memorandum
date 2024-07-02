'use server';

import { errors } from '@/libs/errors';
import { FormState, handleError, handleSuccess } from '@/libs/state';
import { UserSchema } from '@/schemas/auth';
import { deleteVerificationToken } from '@/services/token/email/deleteVerificationToken';
import { getVerificationToken } from '@/services/token/email/getVerificationToken';
import { getUserByCredentials } from '@/services/user/getUser';
import { updateUser } from '@/services/user/updateUser';

const tokenErrors = {
  401: { status: 401, message: 'トークンの有効期限が切れています' },
  404: { status: 404, message: '有効なトークンが見つかりません' },
} as const;

type State = typeof UserSchema;

export const verifyEmail = async (token: string): Promise<FormState<State>> => {
  try {
    const { verificationToken: existingToken } = await getVerificationToken({ token });

    if (!existingToken) {
      return handleError({}, tokenErrors[404]);
    }

    if (new Date(existingToken.expires) < new Date()) {
      return handleError({}, tokenErrors[401]);
    }

    const { user: existingUser } = await getUserByCredentials({ email: existingToken.email });
    if (!existingUser) {
      return handleError({}, errors[401]);
    }

    const { user } = await updateUser({
      id: existingUser.id,
      emailVerified: new Date(),
      email: existingToken.email,
    });

    if (user) {
      await deleteVerificationToken({ id: existingToken.id });
    }
    return handleSuccess({});
  } catch (error) {
    console.log(error);
    return handleError({}, errors[500]);
  }
};
