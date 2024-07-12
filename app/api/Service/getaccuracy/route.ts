import prisma from "../../../libs/prismadb";

interface subid {
  userId: string;
}

export async function POST(req: Request) {
  const body = await req.json() as subid;
  const { userId } = body;

  try {
    const latestRecord = await prisma.saveRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
      select: {
        Percentage: true,
        Correctawn: true,
        Wrongawn: true,
        subjectname: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify(latestRecord), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
