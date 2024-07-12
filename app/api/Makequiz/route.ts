import prisma from "../../libs/prismadb";

interface TestRec {
  name: string;
  takes: Record<string, number>;
  duration: number;
  totalquestions: number;
  Subcatname:string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TestRec;
    const { name, takes, duration, totalquestions,Subcatname } = body;

    // Check if an assessment with the same name already exists
    const existingAssessment = await prisma.assessment.findUnique({
      where: { name: name },
    });

    if (existingAssessment) {
      return new Response(
        JSON.stringify({ error: "An assessment with this name already exists." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Save the assessment configuration
    const newAssessment = await prisma.assessment.create({
      data: {
        name: name,
        takes: takes,
        duration: duration,
        Subcatname:Subcatname,
        totalquestions: totalquestions,
      },
    });

    return new Response(
      JSON.stringify({
        newAssessment,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export const fetchCache = 'force-no-store'