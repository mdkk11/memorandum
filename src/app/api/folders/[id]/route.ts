import { NextRequest, NextResponse } from 'next/server';
import { getPaginationSrc, getPagination } from '@/libs/pagination';
import { Prisma, prisma } from '@/libs/prisma';
import { getOrderBy } from '@/libs/sort';
import { updateFolderSchema } from '@/services/folders/updateFolder';

type Props = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: Props) {
  const id = params.id;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const take = Number(searchParams.get('take') || 9);
  const orderBy = searchParams.get('orderBy') || 'index';
  const authorId = searchParams.get('authorId');
  const isArchive = Boolean(searchParams.get('isArchive')) || false;

  if (isNaN(page) || isNaN(take) || !authorId) {
    return NextResponse.json({ message: 'Invalid Params' }, { status: 400 });
  }

  // 全件取得
  if (!page && !take) {
    const folders = await prisma.folder.findMany({
      where: { authorId, isArchive },
      orderBy: getOrderBy(orderBy),
      include: {
        documents: {
          where: {
            isArchive,
          },
          orderBy: {
            index: 'asc',
          },
        },
      },
    });

    console.log(`GET: /api/folders ${new Date().toISOString()}`);
    return NextResponse.json({
      folders,
    });
  }

  const { skip, currentPage } = getPaginationSrc({ page, take: 9 });

  const [hitCount, data] = await Promise.all([
    prisma.document.count({ where: { folderId: id } }),
    prisma.folder.findUnique({
      where: {
        id,
      },
      include: {
        documents: {
          skip,
          take,
          where: { folderId: id, isArchive },
          orderBy: getOrderBy(orderBy),
        },
      },
    }),
  ]);

  console.log(`GET: /api/folders/${id} ${new Date().toISOString()}`);
  return NextResponse.json({
    folder: data,
    ...getPagination({
      take,
      skip,
      currentPage,
      hitCount,
    }),
  });
}

export async function POST(req: NextRequest, { params }: Props) {
  const id = params.id;
  const body = await req.json();
  const { authorId, ...data } = updateFolderSchema.parse(body);
  const folder = await prisma.folder.update({
    where: { id, authorId },
    data: {
      ...data,
    },
    include: {
      documents: true,
    },
  });

  console.log(`POST: /api/folders/${id} ${new Date().toISOString()}`);
  return Response.json({ folder });
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { searchParams } = new URL(req.url);
    const id = params.id;
    const authorId = searchParams.get('authorId');

    if (typeof id !== 'string' || typeof authorId !== 'string') {
      return Response.json({ message: 'Bad Request' }, { status: 400 });
    }
    const folder = await prisma.folder.delete({
      where: { id, authorId },
    });
    console.log(`DELETE: /api/folders/${id} ${new Date().toISOString()}`);
    return Response.json({ folder }, { status: 200 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2015') {
        return Response.json({ message: 'Not Found' }, { status: 404 });
      }
    }
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
