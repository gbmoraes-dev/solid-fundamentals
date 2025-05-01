import type { Gym } from '@prisma/client'

import type { GymsRepository } from '@/repositories/gyms.repository'

interface RegisterGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface RegisterGymUseCaseResponse {
  gym: Gym
}

export class RegisterGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: RegisterGymUseCaseRequest): Promise<RegisterGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
