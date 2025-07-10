const z = require('zod')

const taskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }).min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string(),
  completed: z.boolean().default(false),
  created_at: z.date().default(new Date().toISOString())
})

function validateTask (object) {
  return taskSchema.safeParse(object)
}

function validatePartialTask (object) {
  return taskSchema.partial().safeParse(object)
}

module.exports = { validateTask, validatePartialTask }
