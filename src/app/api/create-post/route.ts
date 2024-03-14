import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../lib/prisma";
import { Technology } from "../../../../types";



export async function POST (request: { json: () => any } ){
    
    const res = await request.json()
    const {title, content, url, image, certification, technologies, userId} = res;

    const result = await prisma.post.create({
        data:{
            title,
            content,
            image,
            certification,
            url,
            technologies: { connect: technologies.map((tech: Technology) => ({ name: tech.name })) },
            author: {connect: {
                id: userId
            }}

        }
        
    })
    
    return NextResponse.json({result})
}
