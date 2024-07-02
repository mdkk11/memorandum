import { cache } from 'react';
import { getSession } from '@/libs/auth';

export const authGuard = cache(async () => {
  const session = await getSession();
  if (!session || !session.user) {
    throw 'UnAuthorized Error';
  }
  return session.user;
});
