import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeCheckInUseCase } from '@/core/use-cases/check-ins/factories/make-check-in'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { MaxDistanceError } from '@/core/errors/max-distance'

import { MaxNumberOfCheckInsError } from '@/core/errors/max-number-of-check-ins'

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string(),
  })

  const checkInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  try {
    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof MaxDistanceError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof MaxNumberOfCheckInsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
