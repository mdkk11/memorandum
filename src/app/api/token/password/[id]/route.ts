import { NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

type Props = {
  params: { id: string };
};

export async function DELETE(_: NextRequest, { params }: Props) {
  const id = params.id;
  if (typeof id !== 'string') {
    return Response.json({ message: 'Invalid Params' }, { status: 400 });
  }

  try {
    const passwordResetToken = await prisma.passwordResetToken.delete({
      where: { id },
    });
    console.log(`DELETE: /api/token/password/${id} ${new Date().toISOString()}`);
    return Response.json({ passwordResetToken }, { status: 200 });
  } catch (err) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
