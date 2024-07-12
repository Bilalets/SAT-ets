import prisma from '../../../libs/prismadb';

export async function GET(req: Request, { params }: { params: { token: string } }) {
  const token = params.token;

  if (!token || typeof token !== 'string') {
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user || !user.emailTokenExpiry || new Date() > user.emailTokenExpiry) {
      return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationToken: null, emailTokenExpiry: null },
    });

    return new Response(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 500 });
  }
}
