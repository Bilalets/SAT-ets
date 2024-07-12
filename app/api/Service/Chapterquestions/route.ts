import prisma from '../../../libs/prismadb'
interface chapques{
    
    chaptersId : string;
    questionName :string;
    correctAwnser:string;
    awnsers : string[]

}

export async function POST(req:Request) {
    try {
        const body = await req.json() as chapques;
        const { chaptersId ,correctAwnser,awnsers,questionName } = body;

        const newdata: chapques= { chaptersId ,correctAwnser,awnsers,questionName }; 

        const createdsubjectquestions = await prisma.chaptersQuestions.create({ data: newdata });
        return Response.json([createdsubjectquestions]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}