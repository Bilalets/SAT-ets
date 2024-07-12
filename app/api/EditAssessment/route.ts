import prisma from "../../libs/prismadb";
import { Prisma } from "@prisma/client";

export async function PATCH(req: Request) {
  try {
    const { id, takes, totalquestions, duration } = await req.json();

    // Ensure takes is a valid JSON object
    if (typeof takes !== 'object' || takes === null) {
      return new Response(JSON.stringify({ error: "Invalid takes object" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the assessment in the database
    const updatedAssessment = await prisma.assessment.update({
      where: { id },
      data: {
        takes: takes as Prisma.JsonObject,
        totalquestions,
        duration
      }
    });

    return new Response(JSON.stringify(updatedAssessment), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
export const fetchCache = 'force-no-store'