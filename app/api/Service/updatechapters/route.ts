import prisma from '../../../libs/prismadb'

interface updatchaps{
    name:string;
    id: string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updatchaps;
      
      const { name,id }:  updatchaps= body;
    
      const updatedchapters = await prisma.chapters.update({
        where: {
          id
        },
        data: {
          
          name,
        
        },
      });
  
      return Response.json([updatedchapters]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }