import prisma from '../../../libs/prismadb'

interface deletecategory{
    name: string;
    id:string;
}

export async function DELETE(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as deletecategory;
      
      const { id }:  deletecategory = body;
    
      const deletedcategory = await prisma.category.delete({
        where: {
          id:id
        },
      
      });
  
      return Response.json([deletedcategory ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }