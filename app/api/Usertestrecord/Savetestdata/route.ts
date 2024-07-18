import prisma from '../../../libs/prismadb'
interface usertest{
userId :string
Percentage:string
Wrongawn :string
Correctawn:string
subjectname:string
Totalquestion:string
}

export async function POST(req: Request) {

try {
    const body = await req.json() as usertest
    const {Percentage,Correctawn,Wrongawn,subjectname,userId ,Totalquestion}=body
    const createdrecord: usertest = {Percentage,Correctawn,Wrongawn,subjectname,userId,Totalquestion }
    const createdtest= await prisma.saveRecord.create({data:createdrecord})
    return Response.json([createdtest]);
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}


}
export const fetchCache = 'force-no-store'