import { VerificationToken } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services';

type Props = Partial<Pick<VerificationToken, 'email' | 'token'>>;

export async function getVerificationToken({ email, token }: Props): Promise<{ verificationToken: VerificationToken }> {
  const searchParams = new URLSearchParams({
    ...(email && { email }),
    ...(token && { token }),
  });

  return fetch(path(`/api/token/email?${searchParams.toString()}`))
    .then(handleSucceed)
    .catch(handleFailed);
}
