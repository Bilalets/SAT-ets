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

    // Type assertion for `takes`
    const questionsPerSubject: Record<string, number> = {};
    Object.entries(takes as Prisma.JsonObject).forEach(([subjectId, percentTake]) => {
      if (typeof percentTake === 'number') {
        questionsPerSubject[subjectId] = Math.ceil((percentTake / 100) * totalquestions);
      } else {
        console.error(`Invalid takes value for subject ${subjectId}: ${percentTake}`);
      }
    });

    // Track fetched question IDs to avoid duplication
    const fetchedQuestionIds: Set<string> = new Set();

    // Fetch random questions for each subject using the MongoDB $sample aggregation
    const questions = await Promise.all(
      Object.entries(questionsPerSubject).map(async ([subjectId, questionCount]) => {
        const subjectQuestions = await prisma.subjectQuestions.aggregateRaw({
          pipeline: [
            { $match: { subjectsId: subjectId } },
            { $match: { _id: { $nin: Array.from(fetchedQuestionIds) } } },
            { $sample: { size: questionCount } }
          ],
        });

        // Ensure subjectQuestions is an array and not null or undefined
        if (!Array.isArray(subjectQuestions)) {
          console.error(`No questions found for subject ${subjectId}`);
          return [];
        }

        // Add fetched question IDs to the set to prevent re-fetching
        subjectQuestions.forEach((question: any) => fetchedQuestionIds.add(question._id));

        return subjectQuestions.map((question: any) => ({
          questionId: question._id,
          questionName: question.questionName,
          answers: question.awnsers,
          correctAnswer: question.correctAwnser,
          subjectsId: question.subjectsId!,
        }));
      })
    );

    let flattenedQuestions = questions.flat();

    // If fewer questions were fetched than required, fetch additional ones
    if (flattenedQuestions.length < totalquestions) {
      const additionalQuestionsNeeded = totalquestions - flattenedQuestions.length;
      const additionalQuestions = await prisma.subjectQuestions.aggregateRaw({
        pipeline: [
          { $match: { _id: { $nin: Array.from(fetchedQuestionIds) } } },
          { $sample: { size: additionalQuestionsNeeded } }
        ],
      });

      // Ensure additionalQuestions is an array and not null or undefined
      if (Array.isArray(additionalQuestions)) {
        flattenedQuestions = [
          ...flattenedQuestions,
          ...additionalQuestions.map((question: any) => ({
            questionId: question._id,
            questionName: question.questionName,
            answers: question.awnsers,
            correctAnswer: question.correctAwnser,
            subjectsId: question.subjectsId!,
          })),
        ];
      }
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

// Utility function to shuffle array elements
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
