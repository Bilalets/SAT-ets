
import prisma from '../../../libs/prismadb'
interface cat{
    name:string
    serviceId: string;
    backgroundColor:string
    textColor:string
    isShown:boolean
}

export async function POST(req:Request) {
    try {
        const body = await req.json() as cat;
        const { name,serviceId,textColor,backgroundColor ,isShown:boolean} = body;

        const newdata: cat = { name,serviceId,textColor,backgroundColor,isShown:false}; 

        const createdcategory = await prisma.category.create({ data: newdata });
        return Response.json([createdcategory]);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}