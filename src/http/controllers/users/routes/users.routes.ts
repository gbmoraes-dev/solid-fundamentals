import type { FastifyInstance } from 'fastify'

import { register } from '../register.controller'

import { authenticate } from '../authenticate.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/session', authenticate)
}
