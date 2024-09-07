import prisma from "../../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const alljobs = await prisma.jobs.findMany({
      select: {
      id:true,
      image:true,
      jobdesc:true,
      jobtitle:true,
      jobOpenings:true,
      startDate:true,
      endDate:true,
      employmenttype:true
      },
    });
    return Response.json(alljobs);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
