import type { FastifyInstance } from 'fastify'

import { register } from '../register.controller'

import { authenticate } from '../authenticate.controller'

import { refresh } from '../refresh.controller'

import { profile } from '../profile.controller'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
