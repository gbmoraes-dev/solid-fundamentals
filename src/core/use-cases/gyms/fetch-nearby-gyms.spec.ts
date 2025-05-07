import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.in-memory.repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'SmartFit',
      description: 'Maior rede de academias do Brasil.',
      phone: null,
      latitude: -22.9310464,
      longitude: -43.3586176,
    })

    await gymsRepository.create({
      title: 'BodyTech',
      description: 'Melhores academias do Brasil.',
      phone: null,
      latitude: -27.9310464,
      longitude: -41.3586176,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.9310464,
      userLongitude: -43.3586176,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'SmartFit' })])
  })
})
