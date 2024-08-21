import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const allusers = await prisma.user.findMany({
      select: {
        id: true,
       
       
      },
    });
    return Response.json(allusers);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
