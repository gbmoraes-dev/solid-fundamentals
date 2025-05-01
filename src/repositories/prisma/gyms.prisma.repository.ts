import type { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import type { GymsRepository } from '../gyms.repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })

    return gym
  }
}
