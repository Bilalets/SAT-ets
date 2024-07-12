import prisma from '../../../libs/prismadb'

interface deleteservice{
    name: string;
    id:string;
}

export async function DELETE(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as deleteservice;
      
      const { id }:  deleteservice = body;
    
      const deletedservice = await prisma.service.delete({
        where: {
          id:id
        },
      
      });
  
      return Response.json([deletedservice ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }