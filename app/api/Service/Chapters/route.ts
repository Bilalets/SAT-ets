
import prisma from '../../../libs/prismadb'
interface chap{
    name:string
    subjectsId: string;
}

export async function POST(req:Request) {
    try {
        const body = await req.json() as chap;
        const { name, subjectsId } = body;

        const newdata: chap = { name, subjectsId}; 

        const createdchapters= await prisma.chapters.create({ data: newdata });
        return Response.json([createdchapters]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}