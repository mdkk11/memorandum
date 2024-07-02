import { NextRequest, NextResponse } from 'next/server';
import { getPagination, getPaginationSrc } from '@/libs/pagination';
import { prisma } from '@/libs/prisma';
import { getOrderBy } from '@/libs/sort';
import { CreateDocumentServerSchema } from '@/schemas/document';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const take = Number(searchParams.get('take'));
  const orderBy = searchParams.get('orderBy') || 'index';
  const folderId = String(searchParams.get('folderId'));
  const authorId = searchParams.get('authorId');
  const isArchive = Boolean(searchParams.get('isArchive')) || false;

  if (isNaN(page) || isNaN(take) || !authorId) {
    return NextResponse.json({ message: 'Invalid Params' }, { status: 400 });
  }

  // 全件取得
  if (!page && !take) {
    const documents = await prisma.document.findMany({
      where: { isArchive, authorId },
      orderBy: getOrderBy(orderBy),
      include: {
        folder: true,
      },
    });

    console.log(`GET: /api/documents} ${new Date().toISOString()}`);
    return NextResponse.json({
      documents,
    });
  }

  const { skip, currentPage } = getPaginationSrc({ page, take: 9 });
  const [hitCount, data] = await Promise.all([
    prisma.document.count({ where: { folderId } }),
    prisma.document.findMany({
      skip,
      take,
      where: { folderId },
      orderBy: getOrderBy(orderBy),
    }),
  ]);

  console.log(`GET: /api/documents?${searchParams.toString()} ${new Date().toISOString()}`);
  return NextResponse.json({
    documents: data,
    ...getPagination({
      take,
      skip,
      currentPage,
      hitCount,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = CreateDocumentServerSchema.parse(await req.json());
    const document = await prisma.document.create({
      data: {
        ...data,
      },
    });

    console.log(`POST: /api/documents ${new Date().toISOString()}`);
    return Response.json({ document }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
