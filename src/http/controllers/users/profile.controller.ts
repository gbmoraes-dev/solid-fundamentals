import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeProfileUseCase } from '@/core/use-cases/users/factories/make-profile'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUseCase = makeProfileUseCase()

  const { user } = await profileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
