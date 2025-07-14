import { useState } from "react"
import TaskList from "./components/TaskList"
import { PlusIcon } from "@heroicons/react/16/solid"
import TaskForm from "./components/TaskForm"
import { useTasks } from "./hooks/useTasks"


function App() {

  const [showAddForm, setShowAddForm] = useState(false)
  const { tasks, removeTask, createTask, updateTasks } = useTasks()


  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-700 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tasks App</h1>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Agregar Nueva Tarea
          </button>
        </div>

        {showAddForm && (
          <TaskForm setShowAddForm={setShowAddForm} addTask={createTask} />
        )}

        <TaskList tasks={tasks} onDelete={removeTask} onUpdate={updateTasks} />
      </div>
    </div>
  )
}

export default App
