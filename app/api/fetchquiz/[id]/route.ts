import prisma from "../../../libs/prismadb";
import { Prisma } from "@prisma/client";

interface Takes {
  takes: Record<string, number>;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Assessment ID is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const assessment = await prisma.assessment.findUnique({
      where: { Subcatid: id },
    });

    if (!assessment) {
      return new Response(JSON.stringify({ error: "Assessment not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const { totalquestions, takes } = assessment;
    if (!totalquestions || !takes) {
      return new Response(
        JSON.stringify({ error: "Assessment details are missing or invalid" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const questionsPerSubject: Record<string, number> = {};
    Object.entries(takes as Prisma.JsonObject).forEach(
      ([subjectId, percentTake]) => {
        if (typeof percentTake === "number") {
          questionsPerSubject[subjectId] = Math.ceil(
            (percentTake / 100) * totalquestions
          );
        } else {
          console.error(
            `Invalid takes value for subject ${subjectId}: ${percentTake}`
          );
        }
      }
    );

    // Function to fetch random questions
    const fetchRandomQuestions = async (
      subjectId: string,
      questionCount: number
    ) => {
      const allQuestions = await prisma.subjectQuestions.findMany({
        where: { subjectsId: subjectId },
      });

      const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
      return shuffledQuestions.slice(0, questionCount);
    };

    const questions = await Promise.all(
      Object.entries(questionsPerSubject).map(
        async ([subjectId, questionCount]) => {
          try {
            const subjectQuestions = await fetchRandomQuestions(
              subjectId,
              questionCount
            );

            return subjectQuestions.map((question) => ({
              questionId: question.id,
              questionName: question.questionName,
              answers: question.awnsers,
              correctAnswer: question.correctAwnser,
              subjectsId: question.subjectsId!,
            }));
          } catch (error) {
            return [];
          }
        }
      )
    );

    let flattenedQuestions = questions.flat();

    if (flattenedQuestions.length < totalquestions) {
      const additionalQuestionsNeeded =
        totalquestions - flattenedQuestions.length;

      const additionalQuestions = await prisma.subjectQuestions.findMany({
        take: additionalQuestionsNeeded,
        where: {
          id: {
            notIn: flattenedQuestions.map((q) => q.questionId),
          },
        },
      });

      flattenedQuestions = [
        ...flattenedQuestions,
        ...additionalQuestions.map((question) => ({
          questionId: question.id,
          questionName: question.questionName,
          answers: question.awnsers,
          correctAnswer: question.correctAwnser,
          subjectsId: question.subjectsId!,
        })),
      ];
    }

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
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
