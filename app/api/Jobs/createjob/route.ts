import prisma from '../../../libs/prismadb'

interface jobss{
    jobtitle:string;
    id:string;
    imgae:string
    employmenttype:string;
    startDate:Date;
    endDate :Date;
    jobOpenings:string;
    jobdesc:string;
}

export async function POST(req: Request) {
    const body = await req.json() as jobss;
    const {jobdesc,jobtitle,jobOpenings,startDate,endDate,imgae,employmenttype,id}=body
try {
    const existingjob = await prisma.jobs.findFirst({
        where: { jobtitle }
      });
  
      if (existingjob) {
        return Response.json({ error: 'Job Already Exits' }, { status: 500 });
      }
      const newjobData: jobss = { jobdesc,jobtitle,jobOpenings,startDate,endDate,imgae,employmenttype,id};
      const createdjob = await prisma.jobs.create({ data: newjobData });
  
      return Response.json( createdjob);
} catch (error) {
    
}
  }