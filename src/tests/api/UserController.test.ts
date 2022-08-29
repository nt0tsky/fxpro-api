import request from 'supertest'
import { createServiceMockContainer } from '../container'
import { createService } from '../../service'

describe('UserController', () => {
  const container = createServiceMockContainer()
  const service = createService(container)

  beforeEach(async () => {
    const { userRepo } = container.cradle

    await userRepo.flushAll()
  })

  it('Should create user and return 200', async () => {
    const payload = {
      id: 15,
      earnings: '$78.86',
      country: 'Nigeria',
      name: 'Keiko Foley'
    }

    const { body } = await request(service)
      .post('/users')
      .send(payload)

    expect(body.user).toEqual(payload)
  })

  it('Should return the empty array of users', async () => {
    const { body } = await request(service)
      .get('/users')

    expect(body.users.length).toEqual(0)
  })

  it('Should create and return users', async () => {
    const payload = {
      id: 15,
      earnings: '$78.86',
      country: 'Nigeria',
      name: 'Keiko Foley'
    }

    await request(service)
      .post('/users')
      .send(payload)
    const { body } = await request(service)
      .get('/users')

    expect(body.users.length).toEqual(1)
  })
})
