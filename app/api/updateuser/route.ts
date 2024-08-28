import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';

interface UserUpdateData {
  name: string;
  fatherName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  dateofBirth: string;
  userpicture:string
}

export async function PUT(req: Request) {
  try {
    const body = await req.json() as UserUpdateData;
    const { name, fatherName, email, phoneNumber, password, dateofBirth , userpicture} = body;

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        fatherName,
        phoneNumber,
        dateofBirth,
        userpicture,
        ...(hashedPassword && { password: hashedPassword }), // Only update password if it's provided
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating user:', error.message);
      return new Response(error.message, { status: 500 });
    }
  }
}
