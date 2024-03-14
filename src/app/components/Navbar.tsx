'use client'


import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";



function Navbar(){

    const {data: session} = useSession()
console.log(session?.user);


return (
    <nav>
        <Link href={'/'}>
            Home
        </Link>

        {session ? (
            <div>
                <Link href={'profile'}>
                    Perfil
                </Link>
                <button onClick={() => signOut()}>
                    Logout
                </button>
            </div>
        ) : (
            <button onClick={() => signIn()}>
                Sign In
            </button>
        )}
    </nav>
)
}

export default Navbar;