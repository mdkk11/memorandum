import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { getUserByCredentials } from '@/services/user/getUser';
import { isMatch } from '../crypt';
import type { NextAuthConfig } from 'next-auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export default {
  trustHost: true,
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = schema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }
        const { user } = await getUserByCredentials({ email: parsedCredentials.data.email });
        if (!user) {
          return null;
        }
        const match = await isMatch(parsedCredentials.data.password, user.password!);
        if (!match) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
} satisfies NextAuthConfig;
