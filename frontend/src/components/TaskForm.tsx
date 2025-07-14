import { useState } from "react"
import { PlusCircleIcon } from "@heroicons/react/20/solid"

interface TaskFormProps {
  setShowAddForm: (show: boolean) => void
  addTask: (task: NewTask) => Promise<void>
}

interface NewTask {
  title: string
  description: string
  completed?: boolean
  created_at?: Date
}

const TaskForm = ({ setShowAddForm, addTask }: TaskFormProps) => {
  const [newTask, setNewTask] = useState<NewTask>({ title: "", description: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTask(newTask)
    setShowAddForm(false)
    setNewTask({ title: "", description: "" })
  }

  return (
    <section className="mb-6 bg-slate-800 rounded-lg shadow-sm border-2 border-dashed border-blue-500 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Nueva Tarea</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-4 py-3 text-lg text-gray-400 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          />
        </div>
        <div>
          <textarea
            placeholder="Descripción de la tarea"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 text-lg text-gray-400 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Agregar Tarea
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-blue-500 text-sm text-white font-medium rounded-lg bg-transparent hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm