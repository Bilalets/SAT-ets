import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const Userpayment = await prisma.userApplication.findMany({
      select: {
        id: true,
        Name: true,
        isVerified:true,
        FatherName:true,
        Email:true,
        CNIC:true,
        Imageurl:true,
        DateOfBirth:true,
        MobileNumber:true,
        Qualification:true,
        Gender:true,
        Province:true,
        City:true,
        isViewed:true,
        registrationNumber:true
       
      },
    orderBy:{
      createdAt:"desc"
    }
    });
    return Response.json(Userpayment);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
}
export const revalidate = 0
