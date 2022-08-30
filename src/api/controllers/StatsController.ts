import { NextFunction } from 'express'
import { ICityStatsAverage } from '../../domain/use-cases/user/getStatsAverage/getStatsAverage'
import { ICityStats } from '../../domain/use-cases/user/getStatsByCountry/getStatsByCountryUseCase'
import { IServiceCradle } from '../../iface'
import { BaseController, TRequestQuery, TResponse } from './BaseController'

export class StatsController extends BaseController {
  public readonly service: IServiceCradle

  constructor(service: IServiceCradle) {
    super()
    this.service = service
  }

  public statsByCountry = async (
    req: TRequestQuery,
    res: TResponse<{ stats: ICityStats[] }>,
    next: NextFunction
  ): Promise<TResponse<{ stats: ICityStats[] }>> =>
    this.wrap(async () => {
      const stats = await this.service.getStatsByCountryUseCase.execute()

      return res.json({
        stats
      })
    }, next)

  public statsAverage = async (
    req: TRequestQuery,
    res: TResponse<{ stats: ICityStatsAverage[] }>,
    next: NextFunction
  ): Promise<TResponse<{ stats: ICityStatsAverage[] }>> =>
    this.wrap(async () => {
      const stats = await this.service.getStatsAverageUseCase.execute()

      return res.json({
        stats
      })
    }, next)
}
