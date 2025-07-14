import { TrashIcon } from "@heroicons/react/24/outline";
import { type Task } from "../type.tasks";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";

interface Props extends Task {
  onDelete: (id: string) => void;
  onUpdate: (id: string, task: Partial<Task>) => void;
}

const TaskItem = ({ id, title, description, completed, created_at, onDelete, onUpdate }: Props) => {

  const date = new Date(created_at);

  const createAt = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <article
      className=
      {
        `bg-gray-800 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md p-6
         ${completed ? "bg-green-500/10 border-green-500" : "border-gray-700"
        }`
      }
    >

      <div className="flex items-start gap-4">

        <input
          className="w-5 h-5 bg-gray-800 rounded border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
          type="checkbox"
          onChange={() => onUpdate(id, { completed: !completed })}
          checked={completed} />


        <div className="flex-1 min-w-0">
          <h3
            className={
              `text-lg font-semibold mb-2 ${completed ? "text-green-400 line-through" : "text-gray-100"
              }`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`text-sm mb-3 ${completed ? "text-green-400 line-through" : "text-gray-400"}`}
            >
              {description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            {completed ? (
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClockIcon className="w-4 h-4" />
            )}
            <span>{completed ? "Completada" : "Pendiente"}</span>
            <span>- {createAt}</span>
          </div>
        </div>

        <button
          onClick={() => onDelete(id)}
          className="flex-shrink-0 p-2 text-white hover:bg-red-500/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

    </article >
  )
}

export default TaskItem