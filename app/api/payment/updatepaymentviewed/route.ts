import prisma from '../../../libs/prismadb'

interface updateserv{
   isViewed:boolean
    id: string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updateserv;
      
      const {id }:  updateserv= body;
    
      const updatedpaymentviewed = await prisma.userApplication.update({
        where: {
          id
        },
        data: {
          
            isViewed:true
        },
      });
  
      return Response.json([updatedpaymentviewed]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }