import { NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';
import { UpdateUserSchema } from '@/schemas/user';

type Props = {
  params: { id: string };
};

export async function POST(req: NextRequest, { params }: Props) {
  const id = params.id;
  try {
    const body = await req.json();
    const { ...data } = UpdateUserSchema.parse(body);
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
