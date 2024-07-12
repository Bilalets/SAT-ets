// app/api/reset-password/[token]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST( req: Request,
    { params }: { params: { token: string } }) {
  const  token  = params.token;
  const { newPassword } = await req.json();

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null },
    });

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}
