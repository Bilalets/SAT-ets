import prisma from '../../libs/prismadb'
interface serv{
    name:string;
    id:string
    isShown:boolean
}
export async function POST(req: Request) {
    try {
      const body = await req.json() as serv;
      const { name,id,isShown:boolean } = body;
  
      if (!name) {
        return Response.json({ error: 'Name cannot be null or empty' }, { status: 500 });
      }
  
      
      const existingSubject = await prisma.service.findFirst({
        where: { name }
      });
  
      if (existingSubject) {
        return Response.json({ error: 'Name Already Exits' }, { status: 500 });
      }
     
      const newServicetData: serv = { name,id,isShown:false};
      const createdService = await prisma.service.create({ data: newServicetData });
  
      return Response.json(createdService);
    } catch (error:any) {
      console.error(error.message);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }