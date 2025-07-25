const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const tasksRouter = require('./routes/tasks')

// app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use('/api/tasks', tasksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
