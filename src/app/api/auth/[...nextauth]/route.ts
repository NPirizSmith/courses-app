
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })],
    callbacks: {
        async jwt({ token, user }) {
            // Verificar si el correo electrónico del usuario está presente y no es nulo
            if (user?.email) {
                // Buscar el usuario en la base de datos utilizando su correo electrónico
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }
                });
                if (!existingUser) {
                    console.log('Usuario nuevo:', user.email);
                    // Realizar acciones para el usuario nuevo, como registrarlo en la base de datos
                    const newUser = await prisma.user.create({
                        data: {
                            name: user.name || "Usuario nuevo",
                            email: user.email,
                            image: user.image,
                        }
                    });
                    // Asignar el ID del nuevo usuario al token
                    token.sub = newUser.id;
                } else {
                    console.log('Usuario existente:', user.email);
                    // Asignar el ID del usuario existente al token
                    console.log('su id: ', existingUser.id);
                    
                    token.sub = existingUser.id;
                }
                console.log("el tokeeeen", token);
            } else {
                console.log('Correo electrónico del usuario no disponible.');
            }
          
            return token;
            
            
        },
        async session({ session, user, token }) {
          // Verificar si el token.sub tiene un valor válido antes de asignarlo
          if (session?.user && token.sub) {
              session.user.id = token.sub;
          }
          return session;
      }
  }
});

export { handler as GET, handler as POST }