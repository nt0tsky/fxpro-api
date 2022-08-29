import request from 'supertest'
import { createServiceMockContainer } from '../container'
import { createService } from '../../service'

describe('HelloController', () => {
  const container = createServiceMockContainer()
  const service = createService(container)

  it('Should request hello and return 200', async () => {
    await request(service)
      .get('/hello')
      .expect(200)
  })
})
