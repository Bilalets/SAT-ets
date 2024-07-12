import prisma from '../../../libs/prismadb'

interface deletesubb{
    name: string;
    id:string;
}

export async function DELETE(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as deletesubb;
      
      const { id }:  deletesubb = body;
    
      const deletedsubbs = await prisma.subjects.delete({
        where: {
          id:id
        },
      
      });
  
      return Response.json([deletedsubbs ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }