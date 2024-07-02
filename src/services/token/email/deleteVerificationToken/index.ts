import { VerificationToken } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services';

export async function deleteVerificationToken({ id }: { id: string }): Promise<{ verificationToken: VerificationToken }> {
  return fetch(path(`/api/token/email/${id}`), {
    method: 'DELETE',
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
