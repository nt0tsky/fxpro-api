import request from 'supertest'
import { ICityStatsAverage } from '../../domain/use-cases/user/getStatsAverage/getStatsAverage'
import { ICityStats } from '../../domain/use-cases/user/getStatsByCountry/getStatsByCountryUseCase'
import { createServiceMockContainer } from '../container'
import { createService } from '../../service'
import { users } from '../fixtures/users'

describe('StatsController', () => {
  const container = createServiceMockContainer()
  const service = createService(container)
  const statsToCitiesMap = <T extends ICityStats>(stats: T[]) => {
    const russia = stats.find((countryDTO: ICityStats) =>
      countryDTO.country === 'Russian Federation')
    const nigeria = stats.find((countryDTO: ICityStats) =>
      countryDTO.country === 'Nigeria')

    return {
      russia,
      nigeria
    }
  }

  beforeAll(async () => {
    const { addUserUseCase } = container.cradle

    for await (const user of users) {
      await addUserUseCase.execute(user)
    }
  })

  it('Should get stats average', async () => {
    const { body: { stats } } = await request(service)
      .get('/stats/average')
    const { russia, nigeria } = statsToCitiesMap<ICityStatsAverage>(stats)

    expect(russia.earnings).toEqual(39.34)
    expect(russia.users.length).toEqual(3)
    expect(nigeria.earnings).toEqual(56.02)
    expect(nigeria.users.length).toEqual(2)
  })

  it('Should get stats by country', async () => {
    const { body: { stats } } = await request(service)
      .get('/stats/country')
    const { russia, nigeria } = statsToCitiesMap<ICityStats>(stats)

    expect(russia.earnings).toEqual(118.02)
    expect(nigeria.earnings).toEqual(112.05)
  })
})
