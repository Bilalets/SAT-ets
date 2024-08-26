import prisma from '@/app/libs/prismadb';

interface subjectId{
    subjectid:string
}

export async function POST(
  req: Request,
  
) {
  try {
 
    const body = await req.json() as subjectId;
    const { subjectid } = body;
    const user = await prisma.subjectQuestions.findMany({
      where: {
        subjectsId:subjectid
      },
      select: {
        id: true,
        questionName:true,
        awnsers:true,
        correctAwnser:true,
        subjectsId:true
      },
    });

    return Response.json( user );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
export const fetchCache = 'force-no-store'