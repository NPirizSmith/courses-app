'use client'

import { useRouter } from 'next/navigation';

export default function EditPost({ postId }) {
    const router = useRouter();

    function handleClick() {
        router.push(`/update-post/${postId}`);
    }

    return (
        <button onClick={handleClick}>Editar Curso</button>
    );
}
