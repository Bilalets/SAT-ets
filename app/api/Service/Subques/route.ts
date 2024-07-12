import prisma from "../../../libs/prismadb";

interface subid {
  subjectsId: string;
}

export async function POST(req: Request) {
  const body = await req.json() as subid;
  const { subjectsId } = body;

  try {
    const subjectname = await prisma.subjectQuestions.findMany({
      where: {
        subjectsId: subjectsId,
      },
      select: {
        id: true,
        questionName: true,
        correctAwnser: true,
        awnsers: true,
      },
      take: 10,
    });

    return Response.json(subjectname);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
