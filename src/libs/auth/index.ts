import { cache } from 'react';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { prisma } from '@/libs/prisma';
import authConfig from './auth.config';

export const { handlers, signIn, auth, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      });
      if (!dbUser) {
        if (user) {
          token.id = user.id;
          token.image = user.image;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        image: dbUser.image,
        email: dbUser.email as string,
      };
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? '';
        session.user.image = token.image as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

export const getSession = cache(async () => {
  return await auth();
});

export const getServerSession = cache(async (req: NextApiRequest, res: NextApiResponse) => {
  return await auth(req, res);
});
