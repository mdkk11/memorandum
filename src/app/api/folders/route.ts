import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPaginationSrc, getPagination } from '@/libs/pagination';
import { prisma } from '@/libs/prisma';
import { getOrderBy } from '@/libs/sort';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const take = Number(searchParams.get('take'));
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
    prisma.folder.count({ where: { authorId, isArchive } }),
    prisma.folder.findMany({
      skip,
      take,
      where: { authorId, isArchive },
      orderBy: getOrderBy(orderBy),
      include: {
        documents: {
          where: { isArchive },
          orderBy: {
            index: 'asc',
          },
        },
        _count: {
          select: {
            documents: {
              where: {
                isArchive,
              },
            },
          },
        },
      },
    }),
  ]);

  console.log(`GET: /api/folders?${searchParams.toString()} ${new Date().toISOString()}`);
  return NextResponse.json({
    folders: data,
    ...getPagination({
      take,
      skip,
      currentPage,
      hitCount,
    }),
  });
}

export async function POST(req: NextRequest) {
  const schema = z.object({
    title: z.string(),
    index: z.number(),
    authorId: z.string(),
  });

  try {
    const { title, index, authorId } = schema.parse(await req.json());
    const folder = await prisma.folder.create({
      data: {
        title,
        index,
        authorId,
      },
    });
    console.log(`POST: /api/folders ${new Date().toISOString()}`);
    return Response.json({ folder }, { status: 201 });
  } catch (err) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
