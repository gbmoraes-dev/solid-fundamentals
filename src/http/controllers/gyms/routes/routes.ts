import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

import { registerGym } from '../register.controller'

import { searchGyms } from '../search.controller'

import { fetchNearbyGyms } from '../nearby.controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/register', registerGym)

  app.get('/gyms/search', searchGyms)

  app.get('/gyms/nearby', fetchNearbyGyms)
}
