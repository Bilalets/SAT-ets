import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AssessmentRec {
  name: string;
  takes: Record<string, number>;
  duration: number;
  totalquestions: number;
}

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Assessment name is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Fetch the assessment configuration
    const assessment = await prisma.assessment.findUnique({
      where: { name: name },
    });

    if (!assessment) {
      return new Response(
        JSON.stringify({ error: "Assessment not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Type assertion for 'takes' to ensure TypeScript recognizes it correctly
    const takes: Record<string, number> = assessment.takes as Record<string, number>;

    // Handle case where 'takes' might be null or undefined
    if (!takes) {
      return new Response(
        JSON.stringify({ error: "Assessment takes configuration is missing or invalid" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { totalquestions } = assessment;

    if (!totalquestions) {
      return new Response(
        JSON.stringify({ error: "Assessment totalquestions is missing or invalid" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const questionsPerSubject: Record<string, number> = {};
    Object.entries(takes).forEach(([subjectId, percentTake]) => {
      if (typeof percentTake === 'number') {
        questionsPerSubject[subjectId] = Math.ceil((percentTake / 100) * totalquestions); // Use Math.ceil to round up
      } else {
        console.error(`Invalid takes value for subject ${subjectId}: ${percentTake}`);
      }
    });

    // Function to fetch random questions for a subject and shuffle them
    const fetchRandomQuestions = async (subjectId: string, percentTake: number) => {
      const take = Math.ceil((percentTake / 100) * totalquestions); // Calculate the number of questions to fetch

      const subjectQuestions = await prisma.subjectQuestions.findMany({
        where: { subjectsId: subjectId },
        take: take, // Fetch 'take' number of questions
        orderBy: {
          createdAt: "desc",
        },
      });

      const shuffledQuestions = shuffleArray(subjectQuestions).slice(0, take); // Shuffle and slice to exact 'take'

      return shuffledQuestions;
    };

    const shuffleArray = <T>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Fetch questions for each subject in parallel
    const questions = await Promise.all(
      Object.entries(questionsPerSubject).map(async ([id, take]) => {
        const subjectQuestions = await fetchRandomQuestions(id, takes[id]);
        return subjectQuestions.map((question) => ({
          questionId: question.id,
          questionName: question.questionName,
          answers: question.awnsers, // Assuming this is correctly spelled 'answers' in your actual schema
          correctAnswer: question.correctAwnser, // Assuming this is correctly spelled 'correctAnswer' in your actual schema
          subjectsId: question.subjectsId!,
        }));
      })
    );

    let flattenedQuestions = questions.flat();
    flattenedQuestions = shuffleArray(flattenedQuestions).slice(0, totalquestions); // Limit to exactly 'totalquestions'

    return new Response(
      JSON.stringify({
        questions: flattenedQuestions,
        duration: assessment.duration,
        totalquestions: assessment.totalquestions,
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
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export const fetchCache = 'force-no-store'