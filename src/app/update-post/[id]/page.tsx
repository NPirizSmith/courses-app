'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

const UpdatePost = () => {
  const pathname = usePathname();
  const segments = pathname?.split('/');
  const postId = segments[segments.length - 1];
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    url: '',
    certification: false
  });

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          console.error('No se pudo obtener el ID del post');
          return;
        }

        const response = await fetch(`/api/post-by-id/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData.post);
          setFormData({
            title: postData.post.title,
            content: postData.post.content,
            image: postData.post.image || '',
            url: postData.post.url,
            certification: postData.post.certification
          });
        } else {
          console.error('Error fetching post:', response);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/update-post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          image: formData.image,
          url: formData.url,
          certification: formData.certification,
          userId: userId
        })
      });

      if (response.ok) {
        console.log('Post actualizado correctamente');
        // Aquí puedes redirigir o mostrar algún mensaje de éxito
      } else {
        console.error('Error updating post:', response);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Update post</h1>
      {post && (
               <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="url">URL:</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="certification">Certification:</label>
                <input
                  type="checkbox"
                  id="certification"
                  name="certification"
                  checked={formData.certification}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      certification: !formData.certification
                    })
                  }
                />
              </div>
              <button type="submit">Submit</button>
            </form>
      )}
    </div>
  );
};

export default UpdatePost;
