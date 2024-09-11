import prisma from '../../libs/prismadb'
interface userid{
    userId:string
}
export async function POST(req: Request) {
  try {
    const body = await req.json() as userid;
    const {userId} = body;
    if(!userId){
        return Response.json('no id')
    }
    const aggregatedData = await prisma.saveRecord.groupBy({
      by: ['catname', 'subjectname'],
      _count: {
        id: true, 
      },
      where:{
        userId:userId
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 5, 
    });

   
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