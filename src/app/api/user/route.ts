import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/libs/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return Response.json({ user });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return Response.json({ message: 'The email address is already in use' }, { status: 400 });
      }
    }

    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });
  try {
    const { name, email, password } = schema.parse(await req.json());
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log(`POST: /api/user ${new Date().toISOString()}`);
    return Response.json({ user }, { status: 201 });
  } catch (err) {
    console.log(err);

    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
