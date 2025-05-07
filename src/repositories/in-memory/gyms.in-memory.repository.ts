import { randomUUID } from 'node:crypto'

import { type Gym, Prisma } from '@prisma/client'

import type { findManyNearbyParams, GymsRepository } from '../gyms.repository'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby({
    latitude,
    longitude,
  }: findManyNearbyParams): Promise<Gym[]> {
    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: latitude, longitude: longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance <= 10
    })

    return gyms
  }
}
