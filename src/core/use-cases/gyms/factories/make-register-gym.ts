import { PrismaGymsRepository } from '@/repositories/prisma/gyms.prisma.repository'

import { RegisterGymUseCase } from '../register-gym'

export function makeRegisterGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const registerGymUseCase = new RegisterGymUseCase(gymsRepository)

  return registerGymUseCase
}
