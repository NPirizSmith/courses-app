'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DeletePostButton({ postId }) {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const router = useRouter();

    async function handleClick() {
        try {
            if (!session) {
                console.error("No hay sesión activa.");
                return;
            }

            await fetch(`/api/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
          
          
                  body: JSON.stringify({
                    userId: userId
                  })
                });

            router.refresh();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={handleClick}>Borrar este curso</button>
    );
}
