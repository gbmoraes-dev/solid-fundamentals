import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'

import { ZodError } from 'zod'

import { env } from './env'

import { usersRoutes } from './http/controllers/users/routes/routes'

import { gymsRoutes } from './http/controllers/gyms/routes/routes'

import { checkInsRoutes } from './http/controllers/check-ins/routes/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.get('/healthcheck', async () => {
  return { status: 'healthy' }
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
