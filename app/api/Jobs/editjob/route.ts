import prisma from "../../../libs/prismadb";

interface updatejobs {
  jobtitle: string;
  id: string;
  imgae: string;
  employmenttype: string;
  startDate: Date;
  endDate: Date;
  jobOpenings: string;
  jobdesc: string;
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updatejobs;

    const {
      jobdesc,
      jobtitle,
      jobOpenings,
      startDate,
      endDate,
      imgae,
      employmenttype,
      id,
    } = body;

    const updatedjob = await prisma.jobs.update({
      where: {
        id,
      },
      data: {
        jobdesc,
        jobtitle,
        jobOpenings,
        startDate,
        endDate,
        imgae,
        employmenttype,
      },
    });

    return Response.json([updatedjob]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
