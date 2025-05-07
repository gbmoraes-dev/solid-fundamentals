import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins.prisma.repository'

import { PrismaGymsRepository } from '@/repositories/prisma/gyms.prisma.repository'

import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInsUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInsUseCase
}
