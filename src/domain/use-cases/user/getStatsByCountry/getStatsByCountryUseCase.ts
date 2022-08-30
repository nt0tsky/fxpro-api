import { CacheTime, ICacheManager, IServiceCradle } from '../../../../iface'
import { IUseCase } from '../../../buildingBlocks/IUseCase'
import {
  IUserMapper, IUserRepo, User
} from '../../../User'

export interface ICityStats {
  country: string
  earnings: number
}

export class GetStatsByCountryUseCase implements IUseCase<void, ICityStats[]> {
  private readonly userRepo: IUserRepo

  private readonly userMapper: IUserMapper

  private readonly cacheManager: ICacheManager

  constructor({ userRepo, userMapper, cacheManager }: IServiceCradle) {
    this.userRepo = userRepo
    this.userMapper = userMapper
    this.cacheManager = cacheManager
  }

  private aggregateCountryEarningTotal = (users: User[]): ICityStats[] => {
    const countryToEarning = users.reduce((acc, next) => {
      const total = acc[next.country] || 0

      acc[next.country] = Number((total + next.earningsWithoutCurrency).toFixed(2))

      return acc
    }, {} as Record<string, number>)

    return Object.keys(countryToEarning).map<ICityStats>((country) =>
      ({
        country,
        earnings: countryToEarning[country]
      }))
  }

  public execute = async (): Promise<ICityStats[]> =>
    this.cacheManager.getOrCreate<ICityStats[]>(
      GetStatsByCountryUseCase.name,
      async () => {
        const users = await this.userRepo.findAll()

        return this.aggregateCountryEarningTotal(users)
      },
      CacheTime.MINUTE * 5
    )
}
