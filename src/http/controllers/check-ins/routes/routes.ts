import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

import { checkIn } from '../check-in.controller'

import { validate } from '../validate.controller'

import { history } from '../history.controller'

import { metrics } from '../metrics.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', checkIn)

  app.patch('/check-ins/:checkInId/validate', validate)

  app.get('/check-ins/history', history)

  app.get('/check-ins/metrics', metrics)
}
