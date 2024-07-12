import prisma from '../../../libs/prismadb'

interface deletechapters{
    name: string;
    id:string;
}

export async function DELETE(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as deletechapters;
      
      const { id }:  deletechapters = body;
    
      const deletedchapters = await prisma.chapters.delete({
        where: {
          id:id
        },
      
      });
  
      return Response.json([deletedchapters]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }