import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins.prisma.repository'

import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
