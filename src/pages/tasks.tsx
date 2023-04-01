import SupportButton from "@/components/SupportButton"

import { GetServerSideProps } from "next"

import { getSession } from "next-auth/react"

import { FormEvent, useState } from "react"

import Head from "next/head"

import Link from "next/link"

import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'

import { projectFirestore } from "@/services/firebaseConnection"

type TaskList = {
  id: string,
  created: string | Date,
  createdFormatted?: string,
  tarefa: string,
  userId: string,
  nome: string
}

interface TasksProps {
  user: {
    nome: string,
    id: string
  }
  data: string
}

export default function tasks({ user, data }: TasksProps) {
  const [input, setInput] = useState('')
  const [tasklist, setTasklist] = useState<TaskList[]>(JSON.parse(data))

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()
    if(input === '') {
      alert('Insira alguma tarefa no campo')
      return
    }

    await projectFirestore.collection('tasks').add({
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.nome
    }).then((doc) => {
      let data = {
        id: doc.id,
        created: new Date(),
        createdFormatted: new Intl.DateTimeFormat('pt-br', {dateStyle: 'long'}).format(new Date()),
        tarefa: input,
        userId: user.id,
        nome: user.nome
      }
      setTasklist([...tasklist, data])
      setInput('')
    }).catch(err => {
      console.log('ERRO AO CADASTRAR: ', err)
    })
  }

  async function handleDelete(id: string) {
    await projectFirestore.collection('tasks').doc(id).delete().then(() => {
      console.log('DELETADO COM SUCESSO')
      let taskDeleted = tasklist.filter(item => {
        return (item.id !== id)
      })
      setTasklist(taskDeleted)
    }).catch(err => console.log(err))
  }
  
  return (
    <>
      <Head>
        <title>Minhas tarefas - Tasks</title>
      </Head>

      <main className="max-w-6xl my-8 mx-auto p-8 rounded-md bg-slate-800">
        <form className="flex justify-center gap-3" onSubmit={handleAddTask}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Insira sua tarefa" 
            className="w-11/12 h-12 bg-slate-700 border-2 border-slate-600 rounded-md py-1 px-2 text-white" />
          <button type="submit" className="bg-orange-500 px-5 rounded-md">
            <FiPlus size={25} />
          </button>
        </form>

        <h1 className="text-white text-2xl mt-6">
          {tasklist.length > 0 ? `Você tem ${tasklist.length} tarefas!` : 'Você não possui tarefas.'}
        </h1>

        <section>
          {tasklist && tasklist.map(task => (
            <article className="bg-slate-700 my-4 p-3 rounded-md" key={task.id}>
              <Link href={`/tasks/${task.id}`}>
                <p className="cursor-pointer text-slate-200 text-base">{task.tarefa}</p>
              </Link>
              <div className="flex justify-between mt-4">
                <div className="flex justify-center items-center">
                  <div className="flex justify-center items-center">
                    <FiCalendar size={20} color="rgb(249 115 22)" />
                    <time className="text-orange-500 ml-1 mr-4">
                      {task.createdFormatted}
                    </time>
                  </div>
                  <button className="flex justify-center items-center">
                    <FiEdit2 size={20} color="#fff" />
                    <span className="ml-1 text-white cursor-pointer hover:brightness-90">Editar</span>
                  </button>
                </div>
                <button className="flex justify-center items-center" onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="red" />
                  <span className="ml-1 text-white cursor-pointer hover:brightness-90">Excluir</span>
                </button>
              </div>
            </article>
          ))}
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

      <SupportButton />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  
  if(!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const currentTasks = await projectFirestore.collection('tasks').where('userId', '==', session?.id).orderBy('created', 'asc').get()

  const data = JSON.stringify(currentTasks.docs.map(item => {
    return {
      id: item.id,
      createdFormatted: new Intl.DateTimeFormat('pt-br', {dateStyle: 'long'}).format(item.data().created.toDate()),
      ...item.data() 
    }
  }))

  const user = {
    nome: session?.user?.name,
    id: session?.id
  }

  return {
    props: {
      user,
      data
    }
  }
}