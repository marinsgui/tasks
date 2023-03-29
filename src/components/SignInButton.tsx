import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export default function SignInButton() {
    const session = true

  return session ? (
    <button
        onClick={() => {}} 
        className="ml-auto h-10 rounded-3xl flex items-center justify-center gap-3 px-6 font-bold text-white hover:brightness-90 duration-200">
            <img src="https://i.uai.com.br/X6ZjWtqD5I0elFDfdW70lU9izzo=/750x0/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg" alt="Foto do usuário"  className='w-9 h-9 rounded-full'/>
            Olá, Guilherme!
            <FiX size={25} color='#737380' />
    </button>
  ) : (
    <button
        onClick={() => {}} 
        className="ml-auto h-10 rounded-3xl flex items-center justify-center gap-3 px-6 font-bold text-white hover:brightness-90 duration-200">
            <FaGithub size={25} color='rgb(249 115 22)' />
            Entrar com github
    </button>
  )
}
