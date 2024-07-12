import prisma from '@/app/libs/prismadb';

interface emailname{
    email:string
}

export async function POST(
  req: Request,
  
) {
  try {
 
    const body = await req.json() as emailname;
    const { email } = body;
    const user = await prisma.user.findUnique({
      where: {
        email:email
      },
      select: {
        id: true,
      },
    });

    return Response.json( user );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
export const fetchCache = 'force-no-store'