import prisma from '@/app/libs/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name:true,
        fatherName:true,
        city:true,
        phoneNumber:true,
        dateofBirth:true,
        Cnic:true
        
      },
    });

    return Response.json([ user ]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const fetchCache = 'force-no-store'