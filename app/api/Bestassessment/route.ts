// pages/api/top-ten-most-saved.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../libs/prismadb'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Aggregate data to count occurrences
    const aggregatedData = await prisma.saveRecord.groupBy({
      by: ['catname', 'subjectname'],
      _count: {
        id: true, // Count the number of occurrences
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10, // Get top 10 most frequently occurring combinations
    });

    // Map the aggregated data to a suitable format
    const result = aggregatedData.map(entry => ({
      catname: entry.catname,
      subjectname: entry.subjectname,
      totalOccurrences: entry._count.id,
    }));

    return Response.json(result);
  } catch (error) {
    console.error('Error fetching top 10 most saved data:', error);
   
  }
}
