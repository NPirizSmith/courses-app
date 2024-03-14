// components/FavoritePosts.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const FavoritePosts = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const userId = session?.user?.id;
        if (!userId) {
          console.error('No se pudo obtener el ID del usuario');
          return;
        }
        
        const response = await fetch(`/api/user-favorite-posts/${userId}`)
        if (response.ok) {
          const data = await response.json();
          setFavoritePosts(data.favoritePosts);
        } else {
          console.error('Error fetching favorite posts:', response);
        }
      } catch (error) {
        console.error('Error fetching favorite posts:', error);
      }
    };

    fetchFavoritePosts();
  }, [session]);

  return (
    <div>
      <h2>Posts Favoritos</h2>
      <ul>
        {favoritePosts.map((post) => (
          <li key={post.id}>
            {post.title}
            {post.content}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePosts;
