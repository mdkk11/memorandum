import { User } from '@prisma/client';
import { z } from 'zod';
import { SignUpSchema } from '@/schemas/auth';
import { handleFailed, handleSucceed, path } from '../..';

type Props = z.infer<typeof SignUpSchema>;

export async function createUser(payload: Props): Promise<{ user: User }> {
  return fetch(path(`/api/user`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
