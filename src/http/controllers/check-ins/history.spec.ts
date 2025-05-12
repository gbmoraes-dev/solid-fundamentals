import { afterAll, beforeAll, describe, expect, it, should } from 'vitest'

import request from 'supertest'

import { app } from '@/app'

import { prisma } from '@/lib/prisma'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check In History e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'SmartFit',
        description: 'Maior rede de academias do Brasil.',
        phone: null,
        latitude: -22.9310464,
        longitude: -43.3586176,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
    ])
  })
})
