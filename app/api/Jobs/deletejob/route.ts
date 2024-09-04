import prisma from "../../../libs/prismadb";

interface deletejob {
  id: string;
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as deletejob;

    const { id }: deletejob = body;

    const deletedjob = await prisma.jobs.delete({
      where: {
        id: id,
      },
    });

    return Response.json([deletedjob]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
