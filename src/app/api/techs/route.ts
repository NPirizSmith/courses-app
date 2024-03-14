 import { PrismaClient } from "@prisma/client";

 import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();
  
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const technologies = await prisma.technology.findMany();

        return NextResponse.json(technologies);
    } catch (error) {
        console.error('Error al obtener las tecnologías:', error);
        return NextResponse.json({ error: 'Error al obtener las tecnologías' }), ({status: 500});
    }
}

