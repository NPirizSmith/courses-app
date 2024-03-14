import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
  try {
    if (req.method === 'GET') {
      const userId = params.id;


      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { 
          posts: true
        },
      });

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }

      return NextResponse.json({ 
        posts: user.posts 
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error al obtener los posts del usuario:', error);
    return NextResponse.json({ error: 'Error del servidor al obtener los posts del usuario' }, { status: 500 });
  }
}