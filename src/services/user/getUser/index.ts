import { User } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services/index';

export async function getUserByCredentials({ email }: { email: string }): Promise<{ user: User }> {
  const searchParams = new URLSearchParams({
    email,
  });

  return fetch(path(`/api/user?${searchParams.toString()}`))
    .then(handleSucceed)
    .catch(handleFailed);
}
