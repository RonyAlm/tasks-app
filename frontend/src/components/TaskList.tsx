
import { CircleStackIcon } from "@heroicons/react/20/solid"
import TaskItem from "./TaskItem"
import type { Task } from "../type.tasks";

interface Props {
    tasks: Task[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, task: Partial<Task>) => void;
}


const TaskList = ({ tasks, onDelete, onUpdate }: Props) => {

    return (
        <section className="flex flex-col gap-3">
            {tasks.length === 0 ? (
                <article className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 text-center py-12">
                    <CircleStackIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay tareas</h3>
                    <p className="text-gray-500">Agrega tu primera tarea para comenzar</p>
                </article>
            ) : (
                tasks.map((task) => (
                    <TaskItem key={task.id} {...task} onDelete={onDelete} onUpdate={onUpdate} />
                ))
            )}
        </section>
    )
}

export default TaskList