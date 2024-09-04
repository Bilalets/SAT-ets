import prisma from "../../libs/prismadb";

interface deletequestion {
  id: string;
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as deletequestion;

    const { id }: deletequestion = body;

    const deletedques = await prisma.subjectQuestions.delete({
      where: {
        id: id,
      },
    });

    return Response.json([deletedques]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
