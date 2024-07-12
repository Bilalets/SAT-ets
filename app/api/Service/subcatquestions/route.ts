import prisma from '../../../libs/prismadb'
interface subcatques{
    
    subcategoryId: string;
    questionName :string;
    correctAwnser:string;
    awnsers : string[]

}

export async function POST(req: Request) {
    try {
        const body = await req.json() as subcatques;
        const { subcategoryId, correctAwnser, awnsers, questionName } = body;
        
        // Validate inputs to ensure none are undefined
        if (!subcategoryId || !correctAwnser || !awnsers || !questionName) {
            return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
        }

        // Create the subcategory question
        const createdSubcategoryQuestion = await prisma.subcategoryQuestions.create({
            data: {
                subcategoryId,
                questionName,
                correctAwnser,
                awnsers,
            }
        });

        // Return the created subcategory question
        return new Response(JSON.stringify(createdSubcategoryQuestion), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error creating subcategory question:', error);
        
        return new Response(
            JSON.stringify({ error: 'Error creating subcategory question' }), 
            { status: 500 }
        );
    }
}