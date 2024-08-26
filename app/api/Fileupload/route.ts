import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse';
import prisma from '../../libs/prismadb';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;
  const subjectsId = formData.get('subjectsId') as string;

  if (!file || !subjectsId) {
    return NextResponse.json({ error: 'No file or subjectsId provided' }, { status: 400 });
  }

  const data = await file.text();

  try {
    const records = await new Promise<any[]>((resolve, reject) => {
      parse(data, { columns: true }, (err, records) => {
        if (err) {
          return reject(err);
        }
        resolve(records);
      });
    });

    await prisma.subjectQuestions.createMany({
      data: records.map((record) => ({
        questionName: record.questionName,
        awnsers: [
          record['awnsers[0]'],
          record['awnsers[1]'],
          record['awnsers[2]'],
          record['awnsers[3]'],
        ],
        correctAwnser: record.correctAwnser,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        subjectsId: subjectsId, // Use subjectsId from the form data
      })),
    });

    return NextResponse.json({ message: 'File processed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to parse CSV or database error: ${error.message}` }, { status: 500 });
  }
}
