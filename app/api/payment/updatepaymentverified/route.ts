import prisma from '../../../libs/prismadb'

interface updateserv{
   isVerified:boolean
    id: string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updateserv;
      
      const { id }:  updateserv= body;
    
      const updatedpaymentverified = await prisma.userApplication.update({
        where: {
          id
        },
        data: {
          
          isVerified:true
        },
      });
  
      return Response.json([updatedpaymentverified ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }