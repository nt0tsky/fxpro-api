import { ICityStatsAverage } from '../../domain/use-cases/user/getStatsAverage/getStatsAverage'
import { ICityStats } from '../../domain/use-cases/user/getStatsByCountry/getStatsByCountryUseCase'
import { TRequestQuery, TResponse } from './BaseController'
import { UsersController } from './UsersController'

export class UsersStatsController extends UsersController {
  public statsByCountry = async (
    req: TRequestQuery,
    res: TResponse<{ stats: ICityStats[] }>
  ): Promise<TResponse<{ stats: ICityStats[] }>> => {
    const stats = await this.service.getStatsByCountryUseCase.execute()

    return res.json({
      stats
    })
  }

  public statsAverage = async (
    req: TRequestQuery,
    res: TResponse<{ stats: ICityStatsAverage[] }>
  ): Promise<TResponse<{ stats: ICityStatsAverage[] }>> => {
    const stats = await this.service.getStatsAverageUseCase.execute()

    return res.json({
      stats
    })
  }
}
