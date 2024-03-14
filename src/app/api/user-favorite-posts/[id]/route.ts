import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';


export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    
    try {
        if (req.method === 'GET') {
      const userId = params.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { favoritePosts: true },
      });

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }

      return NextResponse.json({ favoritePosts: user.favoritePosts }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error al obtener los posts favoritos:', error);
    return NextResponse.json({ error: 'Error del servidor al obtener los posts favoritos' }, { status: 500 });
  }
}
