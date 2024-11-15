import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeRegisterUseCase } from '@/http/use-cases/factories/make-register.usecase'

import { EmailAlreadyExistsError } from '@/http/use-cases/errors/email-already-exists.error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  const status = await registerUseCase.execute({ name, email, password })

  if (status.isLeft()) {
    if (status.value instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: status.value.message })
    }

    throw status.value
  }

  return reply.status(201).send()
}
