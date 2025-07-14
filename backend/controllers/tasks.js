const crypto = require('node:crypto')
const { validateTask, validatePartialTask } = require('../schemas/tasks')
const Task = require('../models/task')

const getAll = async (request, response, next) => {
  try {
    const tasks = await Task.getAllTasks()
    response.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
}

const getById = async (request, response, next) => {
  const { id } = request.params

  try {
    const task = await Task.getTaskById({ id })
    if (task.length === 0) {
      return response.status(404).json({ error: 'task not found' })
    }
    response.status(200).json(task)
  } catch (error) {
    next(error)
  }
}

const create = async (request, response, next) => {
  const resultValidation = validateTask(request.body)
  if (!resultValidation.success) {
    return response.status(400).json({ error: JSON.parse(resultValidation.error.message) })
  }

  const newTask = {
    id: crypto.randomUUID(),
    ...resultValidation.data
  }

  try {
    const result = await Task.createTask({ input: newTask })
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

const update = async (request, response, next) => {
  const { id } = request.params
  const resultValidation = validatePartialTask(request.body)
  if (!resultValidation.success) {
    return response.status(400).json({ error: JSON.parse(resultValidation.error.message) })
  }

  try {
    const result = await Task.updateTask({ id, input: resultValidation.data })

    if (result.length === 0) {
      return response.status(404).json({ error: 'task not found' })
    }
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (request, response, next) => {
  const { id } = request.params
  try {
    const result = await Task.deleteTask({ id })
    if (result.length === 0) {
      return response.status(404).json({ error: 'task not found' })
    }
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, deleteTask }
