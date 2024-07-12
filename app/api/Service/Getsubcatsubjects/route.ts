import prisma from "../../../libs/prismadb";

interface subjects {
  subcategoryId: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as subjects;
    const { subcategoryId } = body;
    const singlesubCategory = await prisma.subjects.findMany({
      where: {
        subcategoryId: subcategoryId,
      },
      select: {
        name: true,
        id: true,
      },
    });
    return new Response(JSON.stringify(singlesubCategory), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
