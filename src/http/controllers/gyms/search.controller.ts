import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/core/use-cases/gyms/factories/make-search-gyms'

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
