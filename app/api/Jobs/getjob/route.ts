import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const alljobs = await prisma.jobs.findMany({
      select: {
        id: true,
        image: true,
        jobdesc: true,
        jobtitle: true,
        jobOpenings: true,
       
        employmenttype: true,
      },
    });

    return NextResponse.json(alljobs); // No conversion needed
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export const revalidate = 0;
