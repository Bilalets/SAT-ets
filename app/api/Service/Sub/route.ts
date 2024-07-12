
import prisma from '../../../libs/prismadb'
interface Subt{
    name:string
    subcategoryId: string;


}

export async function POST(req:Request) {
    try {
        const body = await req.json() as Subt;
        const { name, subcategoryId } = body;

        const newdata: Subt = { name, subcategoryId}; 

        const createdsubjects = await prisma.subjects.create({ data: newdata });
        return Response.json([createdsubjects]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}