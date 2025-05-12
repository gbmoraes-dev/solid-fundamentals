import { afterAll, beforeAll, describe, expect, it, should } from 'vitest'

import request from 'supertest'

import { app } from '@/app'

import { prisma } from '@/lib/prisma'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check In e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to make a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'SmartFit',
        description: 'Maior rede de academias do Brasil.',
        phone: null,
        latitude: -22.9310464,
        longitude: -43.3586176,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.9310464,
        longitude: -43.3586176,
      })

    expect(response.statusCode).toEqual(201)
  })
})
