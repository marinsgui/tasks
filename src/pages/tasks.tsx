import { GetServerSideProps } from "next"

import { getSession } from "next-auth/react"

import { FormEvent, useState } from "react"

import Head from "next/head"

import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi'

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
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()
    if(input === '') {
      alert('Insira alguma tarefa no campo')
      return
    }

    if(taskEdit) {
      await projectFirestore.collection('tasks').doc(taskEdit.id).update({
        tarefa: input
      }).then(() => {
        let data = tasklist
        let taskIndex = tasklist.findIndex(item => item.id === taskEdit.id)
        data[taskIndex].tarefa = input
        setTasklist(data)
        setTaskEdit(null)
        setInput('')
        })
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

  function handleEditTask(task: TaskList) {
    setTaskEdit(task)
    setInput(task.tarefa)
  }

  function handleCancelEdit() {
    setInput('')
    setTaskEdit(null)
  }
  
  return (
    <>
      <Head>
        <title>Minhas tarefas - Tasks</title>
      </Head>

      <main className="max-w-xs md:max-w-6xl my-8 mx-auto p-8 rounded-md bg-slate-800">
        {taskEdit && (
          <span className="text-white text-lg flex items-center">
            <button onClick={handleCancelEdit}>
              <FiX size={30} color="red" />
            </button>
            Você está editando uma tarefa!
          </span>
        )}

        <form className="flex flex-col md:flex-row justify-center gap-3" onSubmit={handleAddTask}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Insira sua tarefa" 
            className="md:w-11/12 h-12 bg-slate-700 border-2 border-slate-600 rounded-md py-1 px-2 text-white" />
          <button type="submit" className="bg-orange-500 px-5 rounded-md h-12">
            <FiPlus size={25} className="m-auto" />
          </button>
        </form>

        <h1 className="text-white text-2xl mt-6">
          {tasklist.length > 0 ? `Você tem ${tasklist.length} tarefas!` : 'Você não possui tarefas.'}
        </h1>

        <section>
          {tasklist && tasklist.map(task => (
            <article className="bg-slate-700 my-4 p-3 rounded-md" key={task.id}>
              <p className="cursor-pointer text-slate-200 text-base">{task.tarefa}</p>
              <div className="flex flex-col md:flex-row justify-between mt-6">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col md:flex-row justify-center items-center">
                    <FiCalendar size={20} color="rgb(249 115 22)" />
                    <time className="text-orange-500 ml-1 mr-4">
                      {task.createdFormatted}
                    </time>
                  </div>
                  <button className="flex flex-col md:flex-row justify-center items-center" onClick={() => handleEditTask(task)}>
                    <FiEdit2 size={20} color="#fff" />
                    <span className="ml-1 text-white cursor-pointer hover:brightness-90">Editar</span>
                  </button>
                </div>
                <button className="flex flex-col md:flex-row justify-center items-center mt-2" onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="red" />
                  <span className="ml-1 text-white cursor-pointer hover:brightness-90">Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
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