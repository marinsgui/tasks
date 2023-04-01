import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
        onClick={() => signOut()} 
        className="ml-auto h-5 rounded-3xl flex items-center justify-center gap-3 px-4 font-bold text-white text-sm md:text-base hover:brightness-90 duration-200">
            <img src={session.user?.image ?? ''} alt="Foto do usuário"  className='w-7 rounded-full'/>
            <span className='hidden md:inline'>Olá, {session.user?.name}!</span>
            <FiX size={25} color='#737380' />
    </button>
  ) : (
    <button
        onClick={() => signIn('github')} 
        className="ml-auto rounded-3xl flex flex-col md:flex-row md:gap-3 items-center justify-center font-bold text-white text-sm md:text-base hover:brightness-90 duration-200">
            <FaGithub size={25} color='rgb(249 115 22)' />
            Entrar com github
    </button>
  )
}
