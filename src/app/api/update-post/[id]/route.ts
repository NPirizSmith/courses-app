import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma";



export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    try {  
        if (req.method !== 'PUT') {
            return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
        }
        const requestBody = await req.json();
        console.log(requestBody);
        const postId = params.id;
        const userId = requestBody.userId;
        if (!userId) {
            return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
        }

        const title = requestBody.title;
        if (!requestBody) {
            return NextResponse.json({ error: 'Título no disponible' }, { status: 400 });
            
        }
        console.log("Tituloooooooo", title);

        if (!postId) {
            return NextResponse.json({ error: 'ID de post no proporcionado' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
        }

        if (post.authorId !== userId) {
            return NextResponse.json({ error: 'No tiene permiso para editar este post' }, { status: 403 });
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {title}
        });

        return NextResponse.json({ message: 'Post actualizado correctamente', post: updatedPost }, { status: 200 });
    } catch (error) {
        console.error('Error al editar el post:', error);
        return NextResponse.json({ error: 'Error del servidor al editar el post' }, { status: 500 });
    }
}