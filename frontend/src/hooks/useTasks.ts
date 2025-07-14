import { useEffect, useState } from "react";
import taskServices from "../services/taskService.ts";
import { type Task } from "../type.tasks";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  updateTasks: (id: string, task: Partial<Task>) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  reload: () => Promise<void>;
}

export const useTasks = (): TasksState => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await taskServices.getAll();
      setTasks(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);


const updateTasks = async (id: string, task: Partial<Task>) => {
  try {
   const updated = await taskServices.update(id, task);
   setTasks((prev)=> prev.map((t) => (t.id === id ? updated : t)));
  } catch (error) {
    setError((error as Error).message);
  }
}

const createTask = async (task: Partial<Task>) => {
  try {
    const newTask = await taskServices.create(task);
    setTasks((prev) => [...prev, newTask]);
  } catch (error) {
    setError((error as Error).message);
  }
}

const removeTask = async (id: string) => {
  try {
    await taskServices.remove(id)
    setTasks(prev => {
      const filtered = prev.filter(t => t.id !== id)
      return filtered
    })
  } catch (err) {
    setError((err as Error).message)
  }
}


  return {tasks, loading, error, reload: loadTasks, updateTasks, createTask, removeTask};
};
