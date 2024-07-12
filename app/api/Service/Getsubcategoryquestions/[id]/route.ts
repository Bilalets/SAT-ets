import prisma from '../../../../libs/prismadb'


export async function GET(req: Request , { params }: { params: { id: string } }) {
   
      
  
    try {
        const id = params.id;
     
        const subjectname= await prisma.subcategoryQuestions.findMany({
            where:{
              subcategoryId:id
            },
         select:{
          questionName:true,
          correctAwnser:true,
          awnsers:true
         }
          });
          
          return Response.json(subjectname );
    } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        
        }
      }
     
  }