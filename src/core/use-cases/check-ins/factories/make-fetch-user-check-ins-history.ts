import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins.prisma.repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
