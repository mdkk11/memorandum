import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { TokenSchema } from '@/schemas/token';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({ where: { ...(email && { email }), ...(token && { token }) } });
    console.log(`GET: /api/token/password?${searchParams.toString()} ${new Date().toISOString()}`);
    return NextResponse.json({ passwordResetToken });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = TokenSchema.parse(body);
    const passwordResetToken = await prisma.passwordResetToken.create({
      data,
    });
    console.log(`POST: /api/token/password ${new Date().toISOString()}`);
    return NextResponse.json({ passwordResetToken });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
