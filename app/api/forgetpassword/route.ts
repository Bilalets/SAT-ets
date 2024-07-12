// app/api/forgetpassword/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../libs/prismadb';
import { sendPasswordResetEmail } from '../../libs/passwordmailer';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    await prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}
export const fetchCache = 'force-no-store'