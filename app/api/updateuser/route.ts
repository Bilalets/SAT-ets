import prisma from '@/app/libs/prismadb';
interface UserUpdateData {
    name: string;
    fatherName: string;
    email:string;
    phoneNumber:string;
  }

export async function PUT(
  req: Request,
  
) 

{
  try {
    const body = await req.json() as UserUpdateData;
    
    const { name, fatherName, email, phoneNumber }: UserUpdateData = body;
  
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        
        name,
        fatherName,
        phoneNumber,

        

        
        
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