import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { add } from 'date-fns';
import { sendVerificationEmail } from '../../libs/mailer';
import prisma from '../../libs/prismadb';

type User = {
  name: string;
  city: string;
  phoneNumber: string;
  dateofBirth: Date;
  fatherName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: Role;
  Cnic: string;
  userpicture?: string; // Mark as optional
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as User;
    const {
      fatherName,
      name,
      email,
      password,
      city,
      phoneNumber,
      dateofBirth,
      emailVerified,
      Cnic,
      userpicture = "", // Default to empty string if undefined
      role = Role.applicant,
    } = body;

    if (!email || !password) {
      return new NextResponse('Missing information', { status: 400 });
    }

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse('Email already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const emailTokenExpiry = add(new Date(), { hours: 24 });

    // Include userpicture with default empty string
    const userData = {
      name,
      city,
      phoneNumber,
      dateofBirth,
      fatherName,
      email,
      Cnic,
      password: hashedPassword,
      emailVerified: false,
      role,
      verificationToken,
      emailTokenExpiry,
      userpicture, // This is safe to include
    };

    const user = await prisma.user.create({
      data: userData,
    });

    await sendVerificationEmail(email, verificationToken);

    return new NextResponse(
      JSON.stringify({ message: 'User created successfully. Please check your email to verify your account.', user }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Internal server error:', error.message);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export const revalidate = 0;
export const fetchCache = 'force-no-store';
