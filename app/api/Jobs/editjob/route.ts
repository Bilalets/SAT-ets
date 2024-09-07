import prisma from "../../../libs/prismadb";

interface updatejobs {
  jobtitle: string;
  id: string;
  image: string;
  employmenttype: string;
  startDate: string;
  endDate: string;
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
      image,
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
        image,
        employmenttype,
      },
    });

    return Response.json([updatedjob]);
  } catch (error) {
    console.log(error)
  }
}
