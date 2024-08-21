import prisma from "../../libs/prismadb";
import { Prisma } from "@prisma/client";

interface Takes {
  takes: Record<string, number>;
}

export async function GET(req: Request) {
  try {
    const createdAssessments = await prisma.assessment.findMany({
      select: {
        id: true,
        name: true,
        takes: true,
        duration: true,
        Subcatname: true,
        totalquestions: true,
        Subcatid: true
      },
    });

    const processedAssessments = await Promise.all(
      createdAssessments.map(async (assessment) => {
        const takes = assessment.takes as Prisma.JsonObject;

        if (takes && typeof takes === 'object') {
          const parsedTakes: Record<string, number> = {};
          for (const key in takes) {
            if (typeof takes[key] === 'number') {
              parsedTakes[key] = takes[key] as number;
            }
          }

          const subjects = await getSubjectNames({ takes: parsedTakes });
          return {
            ...assessment,
            subjects,
            takes: Object.keys(parsedTakes).reduce((acc, key) => {
              acc[subjects[key]?.name || 'Unknown'] = parsedTakes[key];
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
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const getSubjectNames = async (takes: Takes) => {
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
    console.error("Error fetching subject names:", error);
    return {};
  }
};

export const revalidate = 0;
export const fetchCache = 'force-no-store';
