import prisma from '../../../../libs/prismadb'


export async function GET(req: Request , { params }: { params: { id: string } }) {
   
      
  
    try {
        const id = params.id;
     
        const subjectname= await prisma.category.findMany({
          where: {
            id: id
          },
          select: {
            id: true,
            name:true,
            subcategory: {
              select: {
                id: true,
                name: true,
                subject: {
                  select: {
                    id: true,
                    name: true,
                    chapters:{
                    select:{
                      name:true,
                      id:true
                    }
                    }
                  },
        
                }
              }
            }
          }
          });
          
          return Response.json(subjectname );
    } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        
        }
      }
     
  }