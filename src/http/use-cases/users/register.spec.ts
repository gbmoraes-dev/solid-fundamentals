import { beforeEach, describe, expect, it } from 'vitest'

import * as bcryptjs from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository'

import { RegisterUseCase } from './register'

import { EmailAlreadyExistsError } from '../errors/email-already-exists.error'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register a new user', async () => {
    const status = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: 'password',
    })

    if (status.isLeft()) {
      throw new Error('Should not return an error.')
    }

    if (status.isRight()) {
      const { user } = status.value

      expect(user).toHaveProperty('id')
      expect(status.value.user.id).toEqual(expect.any(String))
    }
  })

  it('should hash a user password', async () => {
    const password = 'password'

    const status = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: password,
    })

    if (status.isLeft()) {
      throw new Error('Should not return an error.')
    }

    if (status.isRight()) {
      const { user } = status.value

      const isPasswordHashed = await bcryptjs.compare(password, user.password)

      expect(isPasswordHashed).toBe(true)
    }
  })

  it('should not be able to register a user with an email that is already in use', async () => {
    const email = 'jhondoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email: email,
      password: 'password',
    })

    const status = await sut.execute({
      name: 'John Doe',
      email: email,
      password: 'password',
    })

    if (status.isRight()) {
      throw new Error('Should not return an success.')
    }

    if (status.isLeft()) {
      expect(status.value).toBeInstanceOf(EmailAlreadyExistsError)
    }
  })
})
