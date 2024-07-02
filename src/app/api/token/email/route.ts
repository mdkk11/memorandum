import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { TokenSchema } from '@/schemas/token';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  try {
    const verificationToken = await prisma.verificationToken.findFirst({ where: { ...(email && { email }), ...(token && { token }) } });
    console.log(`GET: /api/token/email?${searchParams.toString()} ${new Date().toISOString()}`);
    return NextResponse.json({ verificationToken });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = TokenSchema.parse(body);
    const verificationToken = await prisma.verificationToken.create({
      data,
    });
    console.log(`POST: /api/token/email/ ${new Date().toISOString()}`);
    return NextResponse.json({ verificationToken });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
