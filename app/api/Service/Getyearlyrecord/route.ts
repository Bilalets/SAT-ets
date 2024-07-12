import prisma from "../../../libs/prismadb";

interface subid {
  userId: string;
}

export async function POST(req: Request) {
  const body = await req.json() as subid;
  const { userId } = body;

  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`);
    const endDate = new Date(`${currentYear}-12-31`);

    const subjectrecord = await prisma.saveRecord.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        Percentage: true,
        Correctawn: true,
        Wrongawn: true,
        subjectname: true,
        createdAt: true
      }
    });

    return new Response(JSON.stringify(subjectrecord), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
export const revalidate = 0;
