import * as bcryptjs from 'bcryptjs'

import type { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories/users.repository'

import { left, right, type Either } from '../errors/either'

import { InvalidCredentials } from '../errors/invalid-credentials.error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

type Response = Either<InvalidCredentials, AuthenticateUseCaseResponse>

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<Response> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentials())
    }

    const doesPasswordMatches = await bcryptjs.compare(password, user.password)

    if (!doesPasswordMatches) {
      return left(new InvalidCredentials())
    }

    return right({ user })
  }
}
