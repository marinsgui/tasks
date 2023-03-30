import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
        onClick={() => signOut()} 
        className="ml-auto h-10 rounded-3xl flex items-center justify-center gap-3 px-6 font-bold text-white hover:brightness-90 duration-200">
            <img src={session.user?.image ?? ''} alt="Foto do usuário"  className='w-9 h-9 rounded-full'/>
            Olá, {session.user?.name}!
            <FiX size={25} color='#737380' />
    </button>
  ) : (
    <button
        onClick={() => signIn('github')} 
        className="ml-auto h-10 rounded-3xl flex items-center justify-center gap-3 px-6 font-bold text-white hover:brightness-90 duration-200">
            <FaGithub size={25} color='rgb(249 115 22)' />
            Entrar com github
    </button>
  )
}
