import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const allassessment = await prisma.assessment.findMany({
      select: {
        id: true,
        
       
      },
    });
    return Response.json(allassessment);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
