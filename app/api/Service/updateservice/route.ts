import prisma from '../../../libs/prismadb'

interface updateserv{
    name:string;
    id: string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updateserv;
      
      const { name,id }:  updateserv= body;
    
      const updatedservice = await prisma.service.update({
        where: {
          id
        },
        data: {
          
          name,
        
        },
      });
  
      return Response.json([updatedservice ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }