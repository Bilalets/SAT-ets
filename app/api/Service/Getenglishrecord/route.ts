import prisma from "../../../libs/prismadb";

interface subid {
  userId: string;
  subjectname: string; 
}

export async function POST(req: Request) {
  const body = await req.json() as subid;
  const { userId, subjectname } = body;

  try {
    const subjectRecords = await prisma.saveRecord.findMany({
      where: {
        userId: userId,
        subjectname: subjectname 
      },
      select: {
        Percentage: true,
        Correctawn: true,
        Wrongawn: true,
        subjectname: true,
        createdAt: true
      },
    });

    
    return Response.json(subjectRecords);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
