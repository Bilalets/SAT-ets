import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const allService = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
       
      },
    });
    return Response.json(allService);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
