import prisma from "../../../libs/prismadb";

interface subid {
 userId: string;

}

export async function POST(req: Request) {
  const body = await req.json() as subid;
  const { userId} = body;

  try {
    const subjectrecord = await prisma.saveRecord.findMany({
      where: {
        userId:  userId,
      
      },
      select: {
        Percentage:true,
        Correctawn:true,
        Wrongawn:true,
        subjectname:true,
        createdAt:true,
        Totalquestion:true
      },
      
    });

    return Response.json(subjectrecord);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0