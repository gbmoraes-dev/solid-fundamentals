import * as bcryptjs from 'bcryptjs'

import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/users.in-memory.repository'

import { RegisterUseCase } from './register'

import { EmailAlreadyExistsError } from '@/core/errors/email-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash a user password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      '123456',
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a user with an email that is already in use', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
