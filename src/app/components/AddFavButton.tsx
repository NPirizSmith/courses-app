'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../../types';
import { AddFavButtonProps } from '../../../types';


const AddFavButton: React.FC<AddFavButtonProps> = ({ postId, isFavorite }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const userId = session?.user.id



    const handleToggleFavorite = async () => {
        setIsLoading(true);
        try {
            await fetch(`/api/favorite-post/${postId}`, {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId
                }),
            });
            console.log(`Post ${isFavorite ? 'eliminado de' : 'agregado a'} favoritos correctamente`, postId);
        } catch (error) {
            console.error('Error al manipular favoritos:', error);
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <button onClick={handleToggleFavorite} disabled={isLoading}>
            {isLoading ? 'Procesando...' : (isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos')}
        </button>
    );
};

export default AddFavButton;
