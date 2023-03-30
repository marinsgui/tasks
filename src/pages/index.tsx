import { GetStaticProps } from "next"

import Head from "next/head"

export default function Home() {
  return (
    <>
    <Head>
      <title>Tasks - Organize suas tarefas</title>
    </Head>
     <main className="flex flex-col justify-center items-center">
      <img src="/images/task-animate.svg" alt="Tasks" className="mt-8 max-w-xl" />
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-neutral-700">Uma ferramenta para o seu dia-a-dia. Escreva, planeje e se organize</h1>
        <p className="text-2xl text-center text-neutral-700">
          <span className="text-green-500 font-bold">100% gratuita</span> e online.
        </p>
      </section>
      <h2 className="mt-6 font-bold">Apoiadores:</h2>
      <div className="flex justify-center items-center flex-wrap gap-2">
        <img src="https://i.uai.com.br/X6ZjWtqD5I0elFDfdW70lU9izzo=/750x0/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg" alt="Usuário" className="w-16 h-16 rounded-full border-2 border-neutral-700  duration-200 hover:scale-125" />
      </div>
     </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    },
    revalidate: 60 * 60
  }
}