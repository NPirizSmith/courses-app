import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
   const id = res.params.id;    
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
        return NextResponse.json({ error: 'Post no encontrado' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Post encontrado', post }, { status: 200 });
} catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Server error fetching post' }), { status: 500};
  }
}

