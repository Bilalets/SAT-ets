import prisma from "../../../libs/prismadb";

interface SubcatId {
  categoryId: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as SubcatId;
    const { categoryId } = body;
    
    const singlesubCategory = await prisma.subcategory.findMany({
      where: {
        categoryId: categoryId,
      },
      select: {
        name: true,
        id: true,
        subject: true,
        isShown: true,
      },
    });

    return new Response(JSON.stringify(singlesubCategory), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching subcategory:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
