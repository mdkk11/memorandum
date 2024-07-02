import { NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

type Props = {
  params: { id: string };
};

export async function DELETE(req: NextRequest, { params }: Props) {
  const id = params.id;
  if (typeof id !== 'string') {
    return Response.json({ message: 'Invalid Params' }, { status: 400 });
  }

  try {
    const verificationToken = await prisma.verificationToken.delete({
      where: { id },
    });
    console.log(`DELETE: /api/token/email/${id} ${new Date().toISOString()}`);
    return Response.json({ verificationToken }, { status: 200 });
  } catch (err) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
