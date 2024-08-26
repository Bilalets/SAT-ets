import prisma from "../../../libs/prismadb";
import { Prisma } from "@prisma/client";

interface Takes {
  takes: Record<string, number>;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

    const takes: Record<string, number> = assessment.takes as Record<string, number>;

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
        questionsPerSubject[subjectId] = Math.ceil((percentTake / 100) * totalquestions);
      } else {
        console.error(`Invalid takes value for subject ${subjectId}: ${percentTake}`);
      }
    });

    // Keep track of fetched question IDs to avoid duplication
    const fetchedQuestionIds: Set<string> = new Set();

    const fetchRandomQuestions = async (subjectId: string, questionCount: number) => {
      const subjectQuestions = await prisma.subjectQuestions.findMany({
        where: {
          subjectsId: subjectId,
          id: { notIn: Array.from(fetchedQuestionIds) },
        },
        take: questionCount * 2, // Fetch double the required amount to ensure enough questions
      });

      // Add fetched question IDs to the set to prevent re-fetching
      subjectQuestions.forEach(question => fetchedQuestionIds.add(question.id));

      return subjectQuestions;
    };

    const questions = await Promise.all(
      Object.entries(questionsPerSubject).map(async ([id, take]) => {
        const subjectQuestions = await fetchRandomQuestions(id, take);
        return subjectQuestions.map((question) => ({
          questionId: question.id,
          questionName: question.questionName,
          answers: question.awnsers,
          correctAnswer: question.correctAwnser,
          subjectsId: question.subjectsId!,
        }));
      })
    );

    let flattenedQuestions = questions.flat();
    flattenedQuestions = shuffleArray(flattenedQuestions).slice(0, totalquestions);

    // If fewer questions were fetched than required, fetch additional ones
    if (flattenedQuestions.length < totalquestions) {
      const additionalQuestionsNeeded = totalquestions - flattenedQuestions.length;
      const additionalQuestions = await prisma.subjectQuestions.findMany({
        where: {
          id: { notIn: Array.from(fetchedQuestionIds) },
        },
        take: additionalQuestionsNeeded,
      });

      flattenedQuestions = [...flattenedQuestions, ...additionalQuestions.map((question) => ({
        questionId: question.id,
        questionName: question.questionName,
        answers: question.awnsers,
        correctAnswer: question.correctAwnser,
        subjectsId: question.subjectsId!,
      }))];
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

export const fetchCache = 'force-no-store';

// Utility function to shuffle array elements
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
