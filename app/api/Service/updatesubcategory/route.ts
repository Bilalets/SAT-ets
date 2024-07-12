import prisma from "../../../libs/prismadb";

interface updatesubcat {
  name: string;
  id: string;
 
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updatesubcat;

    const { name, id}: updatesubcat =
      body;

    const updatedsubcat = await prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        name,
     
      },
    });

    return Response.json([updatedsubcat]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
