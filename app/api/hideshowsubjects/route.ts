import prisma from '../../libs/prismadb';

interface updatesubcat {
  id: string;
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updatesubcat;
    const { id } = body;

    // Fetch the current value of isShown
    const currentSubcat = await prisma.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!currentSubcat) {
      return new Response('Subcategory not found', { status: 404 });
    }

    // Toggle the isShown value
    const updatedSubcat = await prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        isShown: !currentSubcat.isShown,
      },
    });

    return new Response(JSON.stringify(updatedSubcat), {
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
