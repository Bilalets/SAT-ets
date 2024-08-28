import prisma from '../../libs/prismadb';

interface updateCategory {
  id: string;
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updateCategory;
    const { id } = body;

    // Fetch the current value of isShown
    const currentCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!currentCategory) {
      return new Response('Category not found', { status: 404 });
    }

    // Toggle the isShown value
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        isShown: !currentCategory.isShown,
      },
    });

    return new Response(JSON.stringify(updatedCategory), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}
