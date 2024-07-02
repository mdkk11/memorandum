import { VerificationToken } from '@prisma/client';
import { z } from 'zod';
import { TokenSchema } from '@/schemas/token';
import { handleFailed, handleSucceed, path } from '@/services';

type Props = z.infer<typeof TokenSchema>;

export async function createVerificationToken(payload: Props): Promise<{ verificationToken: VerificationToken }> {
  return fetch(path(`/api/token/email`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
