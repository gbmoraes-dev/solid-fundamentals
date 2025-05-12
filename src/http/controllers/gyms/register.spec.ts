import { afterAll, beforeAll, describe, expect, it, should } from 'vitest'

import request from 'supertest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'SmartFit',
        description: 'Maior rede de academias do Brasil.',
        phone: null,
        latitude: -22.9310464,
        longitude: -43.3586176,
      })

    expect(response.statusCode).toEqual(201)
  })
})
