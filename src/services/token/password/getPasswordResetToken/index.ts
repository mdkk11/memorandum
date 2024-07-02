import { PasswordResetToken } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services';

type Props = Partial<Pick<PasswordResetToken, 'email' | 'token'>>;

export async function getPasswordResetToken({ email, token }: Props): Promise<{ passwordResetToken: PasswordResetToken }> {
  const searchParams = new URLSearchParams({
    ...(email && { email }),
    ...(token && { token }),
  });

  return fetch(path(`/api/token/email?${searchParams.toString()}`))
    .then(handleSucceed)
    .catch(handleFailed);
}
