import { NextRequest, NextResponse } from 'next/server';
import { Prisma, prisma } from '@/libs/prisma';
import { UpdateDocumentServerSchema } from '@/schemas/document';

type Props = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Props) {
  const { searchParams } = new URL(req.url);

  const id = params.id;
  const authorId = searchParams.get('authorId');

  if (!authorId) {
    return NextResponse.json({ message: 'Invalid Params' }, { status: 400 });
  }

  const document = await prisma.document.findUnique({
    where: {
      id,
      authorId,
    },
    include: {
      folder: true,
    },
  });

  console.log(`GET: /api/documents/${id} ${new Date().toISOString()}`);
  return NextResponse.json({
    document,
  });
}

export async function POST(req: NextRequest, { params }: Props) {
  const id = params.id;
  const body = await req.json();

  const { authorId, ...data } = UpdateDocumentServerSchema.parse(body);

  const document = await prisma.document.update({
    where: { id, authorId },
    data: {
      ...data,
    },
    include: {
      folder: true,
    },
  });

  console.log(`POST: /api/documents/${id} ${new Date().toISOString()}`);
  return Response.json({ document });
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const id = params.id;
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get('authorId');
  if (typeof id !== 'string' || typeof authorId !== 'string') {
    return Response.json({ message: 'Bad Request' }, { status: 400 });
  }
  try {
    const document = await prisma.document.delete({
      where: { id, authorId },
    });
    console.log(`DELETE: /api/documents/${id}?authorId=${authorId} ${new Date().toISOString()}`);
    return Response.json({ document }, { status: 200 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2015') {
        return Response.json({ message: 'Not Found' }, { status: 404 });
      }
    }
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
