import { afterAll, beforeAll, describe, expect, it, should } from 'vitest'

import request from 'supertest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'SmartFit',
        description: 'Maior rede de academias do Brasil.',
        phone: null,
        latitude: -22.9310464,
        longitude: -43.3586176,
      })

    await request(app.server)
      .post('/gyms/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'BodyTech',
        description: 'Melhor rede de academias do Brasil.',
        phone: null,
        latitude: -27.9310464,
        longitude: -41.3586176,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.9310464,
        longitude: -43.3586176,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'SmartFit',
      }),
    ])
  })
})
