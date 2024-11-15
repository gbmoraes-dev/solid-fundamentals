import type { FastifyInstance } from 'fastify'

import { register } from '../register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
}
