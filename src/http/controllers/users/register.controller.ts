import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeRegisterUseCase } from '@/core/use-cases/users/factories/make-register'

import { EmailAlreadyExistsError } from '@/core/errors/email-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
