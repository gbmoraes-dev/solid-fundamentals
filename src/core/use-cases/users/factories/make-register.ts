import { PrismaUsersRepository } from '@/repositories/prisma/users.prisma.repository'

import { RegisterUseCase } from '@/core/use-cases/users/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
