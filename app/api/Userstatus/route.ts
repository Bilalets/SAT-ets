import prisma from "../../libs/prismadb";

interface updatejobs {
  
  id: string;
status:string
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updatejobs;

    const {
     status,
      id,
    } = body;

    const updateduser = await prisma.user.update({
      where: {
        id,
      },
      data: {
     status
      },
    });

    return Response.json([updateduser]);
  } catch (error) {
    console.log(error)
  }
}
