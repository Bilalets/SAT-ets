import prisma from "../../../libs/prismadb";
import { ObjectId } from "bson";

interface ServiceId {
  serviceId: string; 
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as ServiceId;
    const { serviceId } = body; 
    

    const categories = await prisma.category.findMany({
      where: {
        serviceId: serviceId, 
      },
      select: {
        name: true,
        id: true,
        backgroundColor:true,
        textColor:true,
        
        
      },
    });

    return new Response(JSON.stringify(categories), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
