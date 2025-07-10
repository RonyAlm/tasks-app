const db = require('./sqlite')
const promisify = require('util').promisify
const logger = require('../utils/logger')

// db.run = promisify(db.run)
db.all = promisify(db.all)
db.get = promisify(db.get)

function runAsync (db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err)

      resolve({
        lastID: this.lastID,
        changes: this.changes
      })
    })
  })
}

const getAllTasks = async () => {
  try {
    const tasks = await db.all('SELECT * FROM tasks', [])
    return tasks.map((task) => ({
      ...task,
      completed: Boolean(task.completed),
      created_at: new Date(task.created_at)
    }))
  } catch (error) {
    logger.error('Error getting tasks', error)
    return []
  }
}

const getTaskById = async ({ id }) => {
  try {
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id])
    return {
      ...task,
      completed: Boolean(task.completed),
      created_at: new Date(task.created_at)
    }
  } catch (error) {
    logger.error('Error getting task', error)
    return []
  }
}

const createTask = async ({ input }) => {
  const sql = 'INSERT INTO tasks (id, title, description, completed, created_at) VALUES (?, ?, ?, ?, ?)'

  try {
    const result = await runAsync(db, sql, [...Object.values(input)])
    return {
      id: result.lastID,
      ...input
    }
  } catch (error) {
    logger.error('Error creating task', error)
  }
}

const updateTask = async ({ id, input }) => {
  const inputKeys = Object.keys(input)
  const sql = `UPDATE tasks SET ${inputKeys.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`

  try {
    const isExists = await getTaskById({ id })
    if (!isExists || isExists.length === 0) return []

    const { changes } = await runAsync(db, sql, [...Object.values(input), id])
    return changes === 1 && {
      id,
      ...input
    }
  } catch (error) {
    logger.error('Error updating task', error)
    return []
  }
}

const deleteTask = async ({ id }) => {
  try {
    const isExists = await getTaskById({ id })
    if (!isExists || isExists.length === 0) return []
    const task = await db.run('DELETE FROM tasks WHERE id = ?', [id])
    return task
  } catch (error) {
    logger.error('Error deleting task', error)
    return []
  }
}

module.exports = { getAllTasks, createTask, getTaskById, updateTask, deleteTask }
