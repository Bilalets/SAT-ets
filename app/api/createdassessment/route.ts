import prisma from "../../libs/prismadb";
import { Prisma } from "@prisma/client";

interface Takes {
  takes: Record<string, number>;
}

export async function GET(req: Request) {
  try {
    const createdassessment = await prisma.assessment.findMany({
      select: {
        id: true,
        name: true,
        takes: true,
        duration: true,
        Subcatname: true,
        totalquestions: true,
      },
    });

    const processedAssessments = await Promise.all(
      createdassessment.map(async (assessment) => {
        const takes = assessment.takes as Prisma.JsonObject;

        if (takes) {
          const parsedTakes: Record<string, number> = {};
          for (const key in takes) {
            if (typeof takes[key] === "number") {
              parsedTakes[key] = takes[key] as number;
            }
          }

          const subjects = await subjectname({ takes: parsedTakes });
          return {
            ...assessment,
            subjects,
            // Map takes to include subject names
            takes: Object.keys(parsedTakes).reduce((acc, key) => {
              acc[subjects[key].name] = parsedTakes[key];
              return acc;
            }, {} as Record<string, number>),
          };
        }
        return assessment;
      })
    );

    return new Response(JSON.stringify(processedAssessments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const subjectname = async (takes: Takes) => {
  try {
    const ids = Object.keys(takes.takes);

    const subjects = await prisma.subjects.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        name: true,
        id: true,
      },
    });

    const subjectMap = subjects.reduce((acc, subject) => {
      acc[subject.id] = subject.name;
      return acc;
    }, {} as Record<string, string>);

    const mappedTakes = Object.entries(takes.takes).reduce((acc, [id, value]) => {
      acc[id] = { count: value, name: subjectMap[id] || 'Unknown' };
      return acc;
    }, {} as Record<string, { count: number; name: string }>);

    return mappedTakes;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const revalidate = 0
export const fetchCache = 'force-no-store'