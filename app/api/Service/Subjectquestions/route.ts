import prisma from '../../../libs/prismadb'
interface subques{
    
    subjectsId: string;
    questionName :string;
    correctAwnser:string;
    awnsers : string[]

}

export async function POST(req:Request) {
    try {
        const body = await req.json() as subques;
        const { subjectsId,correctAwnser,awnsers,questionName } = body;

        const newdata: subques= { subjectsId,correctAwnser,awnsers,questionName }; 

        const createdsubjectquestions = await prisma.subjectQuestions.create({ data: newdata });
        return Response.json([createdsubjectquestions]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}