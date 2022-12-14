import { IServiceCradle, ICacheManager, CacheTime } from '../../../../iface'
import { IUseCase } from '../../../buildingBlocks/IUseCase'
import {
  IUserDTO,
  IUserMapper, IUserRepo, User
} from '../../../User'

export interface ICityStatsAverage {
  country: string
  earnings: number
  users: IUserDTO[]
}

export class GetStatsAverageUseCase implements IUseCase<void, ICityStatsAverage[]> {
  private readonly userRepo: IUserRepo

  private readonly userMapper: IUserMapper

  private readonly cacheManager: ICacheManager

  constructor({
    userRepo, userMapper, cacheManager
  }: IServiceCradle) {
    this.userRepo = userRepo
    this.userMapper = userMapper
    this.cacheManager = cacheManager
  }

  private getHighestUsers = (users: User[], limit: number): IUserDTO[] => {
    const topUsers = users.sort((a, b) =>
      b.earningsWithoutCurrency - a.earningsWithoutCurrency).slice(0, limit)

    return topUsers.map(this.userMapper.toDTO)
  }

  private getAverageEarning = (users: User[]): number => {
    const usersTotalEarn = users.reduce((acc, user) => {
      // eslint-disable-next-line no-param-reassign
      acc += user.earningsWithoutCurrency
      return acc
    }, 0)

    return Number((usersTotalEarn / users.length).toFixed(2))
  }

  private aggregateCountriesEarning = (users: User[], countries: string[]): ICityStatsAverage[] =>
    countries.reduce((acc, country) => {
      const usersGeo = users.filter((user) =>
        user.country === country)

      acc.push({
        country,
        earnings: this.getAverageEarning(usersGeo),
        users: this.getHighestUsers(usersGeo, 10)
      })
      return acc
    }, new Array<ICityStatsAverage>())

  public execute = async (): Promise<ICityStatsAverage[]> =>
    this.cacheManager.getOrCreate<ICityStatsAverage[]>(
      GetStatsAverageUseCase.name,
      async () => {
        const users = await this.userRepo.findAll()
        const countries = Array.from(new Set(users.flatMap(({ country }) =>
          country)))

        return this.aggregateCountriesEarning(users, countries)
      },
      CacheTime.MINUTE * 5
    )
}
