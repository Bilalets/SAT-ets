import prisma from "../../libs/prismadb";

interface updateqb {
  questionName: string;
  id: string;
  awnsers: string[];
  correctAwnser: string;
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updateqb;

    const { questionName, id, correctAwnser, awnsers }: updateqb = body;

    const updatedcategory = await prisma.subjectQuestions.update({
      where: {
        id,
      },
      data: {
        questionName,
        correctAwnser,
        awnsers,
      },
    });

    return Response.json([updatedcategory]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
