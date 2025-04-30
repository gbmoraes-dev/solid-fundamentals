import { PrismaUsersRepository } from '@/repositories/prisma/users.prisma.repository'

import { ProfileUseCase } from '../profile'

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const profileUseCase = new ProfileUseCase(usersRepository)

  return profileUseCase
}
