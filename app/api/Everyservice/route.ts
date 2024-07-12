import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    const allService = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        // Select categories and within categories, select subcategories
        category: {
          select: {
            id: true,
            name: true,
         
           
            // Select subcategories and within them, select subjects
            subcategory: {
              select: {
                id: true,
                name: true,
                
                // Select subjects and within them, select chapters
                subject: {
                  select: {
                    id: true,
                    name: true,
                    // Select chapters associated with the subject
                    chapters: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return Response.json(allService);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export const revalidate = 0
export const fetchCache = 'force-no-store'