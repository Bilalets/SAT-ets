import prisma from '../../../libs/prismadb'

interface jobss{
    jobtitle:string;
    id:string;
    image:string
    employmenttype:string;
    startDate:string;
    endDate :string;
    jobOpenings:string;
    jobdesc:string;
}

export async function POST(req: Request) {
    const body = await req.json() as jobss;
    const {jobdesc,jobtitle,jobOpenings,startDate,endDate,image,employmenttype,id}=body
try {
    const existingjob = await prisma.jobs.findFirst({
        where: { jobtitle }
      });
  
      if (existingjob) {
        return Response.json({ error: 'Job Already Exits' }, { status: 500 });
      }
      const newjobData: jobss = { jobdesc,jobtitle,jobOpenings,startDate,endDate,image,employmenttype,id};
      const createdjob = await prisma.jobs.create({ data: newjobData });
  
      return Response.json([createdjob]);
} catch (error) {
    console.log(error)
}
  }