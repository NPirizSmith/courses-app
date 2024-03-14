import prisma from "../../lib/prisma";
import Posts from "./components/Posts";
import { getServerSession } from "next-auth/next"

async function getPosts(userId: string) {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: { name: true }
            },
            userFavorites: {
                where: {
                    id: userId
                },
                select: {
                    id: true
                }
            },
            technologies: true // Incluir las tecnologías asociadas a cada post
        }
    });

    return posts.map(post => ({
        ...post,
        isFavorite: post.userFavorites.length > 0
    }));
}

export default async function Home() {
    const session = await getServerSession()
    
    const userId = session?.user.id; // ID del usuario (puedes obtenerlo de la autenticación)
    const posts = await getPosts(userId);

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>Feed</h1>
            {
                posts.map((post) => {
                    return (
                        <Posts
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            authorName={post.author?.name}
                            url={post.url}
                            technologies={post.technologies}
                            isFavorite={post.isFavorite}
                        />
                    )
                })
            }
        </main>
    );
}
