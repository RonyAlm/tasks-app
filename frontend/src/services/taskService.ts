import { type Task } from '../type.tasks'

// const baseURL = import.meta.env.BACKEND_URL
const baseURL = 'http://localhost:3005/api/tasks'

const getAll = async () => {
    const response = await fetch(baseURL, { method: 'GET' })
    return response.json()
}

const getById = async (id: string) => {
    const response = await fetch(`${baseURL}/${id}`, { method: 'GET' })
    return response.json()
}

const create = async (task: Partial<Task>) => {
    const response = await fetch(baseURL, 
        { 
            headers: { 'Content-Type': 'application/json' }, 
            method: 'POST', body: JSON.stringify(task) 
        })
    if (!response.ok) throw new Error('Error creating task')
    return response.json()
}

const update = async (id: string, task: Partial<Task>) => {
    const response = await fetch(`${baseURL}/${id}`, 
        {   
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT', body: JSON.stringify(task)
        })
    if (!response.ok) throw new Error('Error updating task')
    return response.json()
}

const remove = async (id: string) => {
    const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Error removing task')
    return { success: true }
}

export default { getAll, getById, create, update, remove }