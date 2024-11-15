import * as bcryptjs from 'bcryptjs'

import { EmailAlreadyExistsError } from '../errors/email-already-exists.error'

import type { UsersRepository } from '@/repositories/users.repository'

import { left, right, type Either } from '../errors/either'

import type { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

type Response = Either<EmailAlreadyExistsError, RegisterUseCaseResponse>

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<Response> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      return left(new EmailAlreadyExistsError())
    }

    const hashedPassword = await bcryptjs.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return right({ user })
  }
}
