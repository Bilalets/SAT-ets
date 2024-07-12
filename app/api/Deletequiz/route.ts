import prisma from "../../libs/prismadb";

interface deletequiz {
  id: string;
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as deletequiz;

    const { id }: deletequiz = body;

    const deletedservice = await prisma.assessment.delete({
      where: {
        id: id,
      },
    });

    return Response.json([deletedservice]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const fetchCache = 'force-no-store'