import { beforeEach, describe, expect, it } from 'vitest'

import * as bcryptjs from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository'

import { AuthenticateUseCase } from './authenticate'

import { InvalidCredentials } from '../errors/invalid-credentials.error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await bcryptjs.hash('password', 6),
    })

    const status = await sut.execute({
      email: 'jhondoe@example.com',
      password: 'password',
    })

    if (status.isLeft()) {
      throw new Error('Should not return an error.')
    }

    if (status.isRight()) {
      const { user } = status.value

      expect(user).toHaveProperty('id')
      expect(user.id).toEqual(expect.any(String))
    }
  })

  it('should not be able to authenticate with wrong email', async () => {
    const status = await sut.execute({
      email: 'jhondoe@example.com',
      password: 'password',
    })

    if (status.isRight()) {
      throw new Error('Should not return an success.')
    }

    if (status.isLeft()) {
      expect(status.value).toBeInstanceOf(InvalidCredentials)
    }
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await bcryptjs.hash('password', 6),
    })

    const status = await sut.execute({
      email: 'jhondoe@example.com',
      password: 'pass',
    })

    if (status.isRight()) {
      throw new Error('Should not return an success.')
    }

    if (status.isLeft()) {
      expect(status.value).toBeInstanceOf(InvalidCredentials)
    }
  })
})
