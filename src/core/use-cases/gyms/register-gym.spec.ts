import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.in-memory.repository'

import { RegisterGymUseCase } from './register-gym'

let gymsRepository: InMemoryGymsRepository
let sut: RegisterGymUseCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new RegisterGymUseCase(gymsRepository)
  })

  it('should be able to register a new user', async () => {
    const { gym } = await sut.execute({
      title: 'SmartFit',
      description: 'Maior rede de academias do Brasil.',
      phone: null,
      latitude: -22.9310464,
      longitude: -43.3586176,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
