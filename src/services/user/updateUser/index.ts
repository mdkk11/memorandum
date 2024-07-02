import { User } from '@prisma/client';
import { z } from 'zod';
import { UpdateUserSchema } from '@/schemas/user';
import { handleFailed, handleSucceed, path } from '@/services/index';

type Props = z.infer<typeof UpdateUserSchema>;

export async function updateUser({ id, ...props }: Props): Promise<{ user: User }> {
  return fetch(path(`/api/user/${id}`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...props }),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
