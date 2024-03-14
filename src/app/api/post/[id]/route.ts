import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;
    
    try {
        const post = await prisma.post.delete({
            where: {id}
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        return NextResponse.error();
    }
}
