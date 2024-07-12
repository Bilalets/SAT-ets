import prisma from '../../../libs/prismadb'

interface updatecat{
    name:string;
    id: string;
    backgroundColor:string;
    textColor:string;
}

export async function PUT(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as  updatecat;
      
      const { name,id, backgroundColor, textColor}:  updatecat= body;
    
      const updatedcategory = await prisma.category.update({
        where: {
          id
        },
        data: {
          
          name,
          backgroundColor,
          textColor
        
        },
      });
  
      return Response.json([updatedcategory]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }