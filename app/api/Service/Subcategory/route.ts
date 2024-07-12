import prisma from "../../../libs/prismadb";
interface Subcat {
  name: string;
  categoryId: string;
  isShown:boolean
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Subcat;
    const { name, categoryId,isShown} = body;

    const newdata: Subcat = { name, categoryId,isShown:false };

    const createdsubcategory = await prisma.subcategory.create({
      data: newdata,
    });
    return Response.json([createdsubcategory]);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
