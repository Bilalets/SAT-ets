import prisma from '../../../libs/prismadb'

interface deletesubcategory{
    
    id:string;
}

export async function DELETE(
    req: Request,
    
  ) 
  
  {
    try {
      const body = await req.json() as deletesubcategory;
      
      const { id }:  deletesubcategory = body;
    
      const deletedsubcategory = await prisma.subcategory.delete({
        where: {
          id:id
        },
      
      });
  
      return Response.json([deletedsubcategory ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }