import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.in-memory.repository'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
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
      query: 'SmartFit',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'SmartFit' })])
  })

  it('should be able to search for paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `SmartFit ${i}`,
        description: 'Maior rede de academias do Brasil.',
        phone: null,
        latitude: -22.9310464,
        longitude: -43.3586176,
      })
    }

    const { gyms } = await sut.execute({
      query: 'SmartFit',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'SmartFit 21' }),
      expect.objectContaining({ title: 'SmartFit 22' }),
    ])
  })
})
