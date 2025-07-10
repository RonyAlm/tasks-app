const express = require('express')
const { getAll, getById, create, update, deleteTask } = require('../controllers/tasks')
const tasksRouter = express.Router()

tasksRouter.get('/', getAll)
tasksRouter.get('/:id', getById)
tasksRouter.post('/', create)
tasksRouter.put('/:id', update)
tasksRouter.delete('/:id', deleteTask)

module.exports = tasksRouter
