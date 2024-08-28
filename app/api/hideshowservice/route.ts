import prisma from '../../libs/prismadb';

interface updateservice {
  id: string;
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as updateservice;
    const { id } = body;

    // Fetch the current value of isShown
    const currentService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!currentService) {
      return new Response('Service not found', { status: 404 });
    }

    // Toggle the isShown value
    const updatedService = await prisma.service.update({
      where: {
        id,
      },
      data: {
        isShown: !currentService.isShown,
      },
    });

    return new Response(JSON.stringify(updatedService), {
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
