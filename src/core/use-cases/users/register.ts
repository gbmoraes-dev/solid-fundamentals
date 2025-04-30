import * as bcryptjs from 'bcryptjs'

import type { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories/users.repository'

import { EmailAlreadyExistsError } from '@/core/errors/email-already-exists'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const hash = await bcryptjs.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hash,
    })

    return { user }
  }
}
