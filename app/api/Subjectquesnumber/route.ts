import prisma from "../../libs/prismadb";

export async function GET(req: Request) {
  try {
    // Fetch unique subject IDs from the subjectQuestions table
    const uniqueSubjectIds = await prisma.subjectQuestions.findMany({
      select: {
        subjectsId: true,
      },
      distinct: ['subjectsId'], // Ensures unique subject IDs
    });

    // Fetch the subject names, subcategory names, category names, and the count of questions for each subject
    const subjectsData = await Promise.all(
      uniqueSubjectIds.map(async ({ subjectsId }) => {
        if (subjectsId) {
          // Fetch the subject along with its subcategory and category names
          const subject = await prisma.subjects.findUnique({
            where: { id: subjectsId },
            select: {
              name: true,
              Subcategory: {
                select: {
                  name: true,
                  Category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          });

          // Fetch the count of questions associated with this subject
          const questionCount = await prisma.subjectQuestions.count({
            where: { subjectsId },
          });

          return {
            subjectName: subject?.name || '',
            subcategoryName: subject?.Subcategory?.name || '',
            categoryName: subject?.Subcategory?.Category?.name || '',
            questionCount,
          };
        }
        return null;
      })
    );

    // Filter out any null values
    const filteredSubjectsData = subjectsData.filter((subject): subject is { subjectName: string; subcategoryName: string; categoryName: string; questionCount: number } => subject !== null);

    // Group by categoryName and then by subcategoryName
    const groupedData: Record<string, { categoryName: string; subcategories: Record<string, { subcategoryName: string; subjects: { subjectName: string; questionCount: number }[] }> }> = {};

    filteredSubjectsData.forEach(({ categoryName, subcategoryName, subjectName, questionCount }) => {
      if (categoryName) {
        if (!groupedData[categoryName]) {
          groupedData[categoryName] = {
            categoryName,
            subcategories: {},
          };
        }

        if (!groupedData[categoryName].subcategories[subcategoryName || '']) {
          groupedData[categoryName].subcategories[subcategoryName || ''] = {
            subcategoryName: subcategoryName || '',
            subjects: [],
          };
        }

        groupedData[categoryName].subcategories[subcategoryName || ''].subjects.push({ subjectName, questionCount });
      }
    });

    // Convert the grouped data to an array of categories, each containing subcategories and subjects
    const result = Object.values(groupedData).map(category => ({
      categoryName: category.categoryName,
      subcategories: Object.values(category.subcategories),
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}

export const revalidate = 0;
