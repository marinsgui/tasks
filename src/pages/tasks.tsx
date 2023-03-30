import Head from "next/head"

import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'

export default function tasks() {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Tasks</title>
      </Head>

      <main className="max-w-6xl my-8 mx-auto p-8 rounded-md bg-slate-800">
        <form className="flex justify-center gap-3">
          <input type="text" placeholder="Insira sua tarefa" className="w-11/12 h-12 bg-slate-700 border-2 border-slate-600 rounded-md py-1 px-2 text-white" />
          <button type="submit" className="bg-orange-500 px-5 rounded-md">
            <FiPlus size={25} />
          </button>
        </form>

        <h1 className="text-white text-2xl mt-6">Você tem 2 tarefas!</h1>

        <section className="bg-slate-700 my-4 p-3 rounded-md">
          <article>
            <p className="cursor-pointer text-slate-200 text-base">bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
            <div className="flex justify-between mt-4">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <FiCalendar size={20} color="rgb(249 115 22)" />
                  <time className="text-orange-500 ml-1 mr-4">30 de março de 2023</time>
                </div>
                <button className="flex justify-center items-center">
                  <FiEdit2 size={20} color="#fff" />
                  <span className="ml-1 text-white cursor-pointer hover:brightness-90">Editar</span>
                </button>
              </div>
              <button className="flex justify-center items-center">
                <FiTrash size={20} color="red" />
                <span className="ml-1 text-white cursor-pointer hover:brightness-90">Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className="max-w-6xl my-4 mx-auto p-4 bg-slate-800 rounded-md">
        <h3 className="text-orange-500 text-3xl">Obrigado por apoiar esse projeto!</h3>
        <div className="mt-4 flex items-center">
          <FiClock size={28} color="#fff" />
          <time className="text-white text-xl p-3">
            Última doação foi há 3 dias.
          </time>
        </div>
      </div>
    </>
  )
}
