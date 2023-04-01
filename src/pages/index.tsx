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
        <p className="text-2xl text-center text-neutral-700 py-4">
          <span className="text-green-500 font-bold">100% gratuita</span> e online.
        </p>
      </section>
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