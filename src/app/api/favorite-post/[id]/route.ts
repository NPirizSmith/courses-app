import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma";


export async function POST (request: { json: () => any }, {params}: { params: { id: string } }) {
    const id = params.id;
    const res = await request.json()
    const {userId} = res;

    try {
        console.log("Recibiendo datos de la solicitud:", request);


        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { favoritePosts: true },
        });
        console.log("Usuario encontrado:", existingUser);

        const existingPost = await prisma.post.findUnique({
            where: { id: id },
        });
        console.log("Publicación encontrada:", existingPost);

        if (!existingUser || !existingPost) {
            throw new Error('Usuario o post no encontrado');
        }
        const isPostInFavorites = existingUser.favoritePosts.some(post => post.id === id);

        const updatedUser = isPostInFavorites
            ? await prisma.user.update({
                where: { id: userId },
                data: {
                    favoritePosts: {
                        disconnect: { id: id },
                    },
                },
                include: { favoritePosts: true },
            })
            : await prisma.user.update({
                where: { id: userId },
                data: {
                    favoritePosts: {
                        connect: { id: id },
                    },
                },
                include: { favoritePosts: true },
            });

        console.log("Usuario actualizado con favoritos:", updatedUser);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error al manipular favoritos:', error);
        return NextResponse.error();
    }
}

export async function DELETE(request: { json: () => any }, {params}: { params: { id: string } }) {
    const id = params.id;
    const res = await request.json()
    const {userId} = res;


    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { favoritePosts: true },
        });

        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }


        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favoritePosts: {
                    disconnect: { id: id },
                },
            },
            include: { favoritePosts: true },
        });

        console.log("Post eliminado de favoritos correctamente", id);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
        return NextResponse.error();
    }
}