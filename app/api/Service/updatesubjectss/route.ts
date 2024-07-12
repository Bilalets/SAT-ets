import prisma from '../../../libs/prismadb'

interface updatsubss{
    name:string;
    id: string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updatsubss;
      
      const { name,id }:  updatsubss= body;
    
      const updatedsubjectss = await prisma.subjects.update({
        where: {
          id
        },
        data: {
          
          name,
        
        },
      });
  
      return Response.json([updatedsubjectss]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }