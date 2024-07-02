import { PasswordResetToken } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services';

export async function deletePasswordResetToken({ id }: { id: string }): Promise<{ passwordResetToken: PasswordResetToken }> {
  return fetch(path(`/api/token/password/${id}`), {
    method: 'DELETE',
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
