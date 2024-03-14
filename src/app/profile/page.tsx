'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import DefaultProfilePicture from '../../../public/default-profile-picture.jpg'
import { useState } from "react"
import prisma from "../../../lib/prisma"
import FavoritePosts from "../components/FavPostsProfile"
import CreatedPosts from "../components/CreatedPostsProfile"

const Profile = () => {
  const {data: session} = useSession()
  const [favoritePosts, setFavoritePosts] = useState([])
  
  const userImageUrl = session?.user?.image || DefaultProfilePicture

//   const fetchFavoritePosts = async () => {
//     if (session?.user) {
//       try {
//         const user = await prisma.user.findUnique({
//           where: { id: session.user.id },
//           include: { favoritePosts: true },
//         });
//         setFavoritePosts(user.favoritePosts);
//       } catch (error) {
//         console.error("Error fetching favorite posts:", error);
//       }
//     }
//   };

//   // Llama a fetchFavoritePosts cuando el componente se monta
//   fetchFavoritePosts();
// console.log(favoritePosts);

  return (
    <div>
    <div>Tu perfil</div>
    <h1>{session?.user.id}</h1>
    <h1>{session?.user?.name}</h1>
    <img src={userImageUrl} alt="user profile picture" />
    <FavoritePosts />
    <CreatedPosts/>
    </div>
  )
}

export default Profile