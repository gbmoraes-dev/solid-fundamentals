import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeAuthenticateUseCase } from '@/http/use-cases/factories/make-authenticate.usecase'

import { InvalidCredentials } from '@/http/use-cases/errors/invalid-credentials.error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const status = await authenticateUseCase.execute({ email, password })

  if (status.isLeft()) {
    if (status.value instanceof InvalidCredentials) {
      return reply.status(400).send({ message: status.value.message })
    }

    throw status.value
  }

  return reply.status(200).send()
}
