import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/core/use-cases/check-ins/factories/make-validate-check-in'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
