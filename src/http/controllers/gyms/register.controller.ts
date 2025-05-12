import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeRegisterGymUseCase } from '@/core/use-cases/gyms/factories/make-register-gym'

export async function registerGym(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    registerGymBodySchema.parse(request.body)

  const registerGymUseCase = makeRegisterGymUseCase()

  await registerGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
