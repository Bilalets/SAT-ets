import prisma from "../../libs/prismadb";

interface UserRecord {
  userId: string | null;
}

export async function POST(req: Request) {
    const body = await req.json() as UserRecord;
    const { userId } = body;

    if (!userId) {
        return Response.json({ error: "User ID cannot be null" }, { status: 400 });
    }
    
    try {
      
        const userRecords = await prisma.saveRecord.findMany();

        if (!userRecords.length) {
            return Response.json({ error: "No user records found" }, { status: 404 });
        }
       
        const userFilteredRecords = userRecords.filter(record => record.userId === userId);
        if (!userFilteredRecords.length) {
            return Response.json({ error: "No records found for the provided user" }, { status: 404 });
        }

        const userAccuracies = userRecords.reduce((acc, record) => {
            if (record.userId) { 
                if (!acc[record.userId]) {
                    acc[record.userId] = { sum: 0, count: 0 };
                }
                acc[record.userId].sum += parseInt(record.Percentage);
                acc[record.userId].count += 1;
            }
            return acc;
        }, {} as { [key: string]: { sum: number, count: number } });

        const rankedUsers = Object.keys(userAccuracies).map(userId => ({
            userId,
            accuracy: userAccuracies[userId].sum / userAccuracies[userId].count
        }));

        
        rankedUsers.sort((a, b) => b.accuracy - a.accuracy);

      
        const userRank = rankedUsers.findIndex(user => user.userId === userId) + 1;

      
        const userPosition = {
           
            rank: userRank

        };

        return new Response(JSON.stringify(userPosition), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
export const fetchCache = 'force-no-store'