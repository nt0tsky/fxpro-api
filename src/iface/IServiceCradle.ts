import { IUseCase } from '../domain/buildingBlocks/IUseCase'
import { IAddUserInput } from '../domain/use-cases/user/addUser/addUserInput'
import { ICityStatsAverage } from '../domain/use-cases/user/getStatsAverage/getStatsAverage'
import { ICityStats } from '../domain/use-cases/user/getStatsByCountry/getStatsByCountryUseCase'
import { IUserDTO, IUserMapper, IUserRepo } from '../domain/User'
import { ICacheManager } from './ICacheManager'
import { IHelloService } from './IHelloService'

export interface IServiceCradle {
  cacheManager: ICacheManager
  helloService: IHelloService

  // infra
  userRepo: IUserRepo
  userMapper: IUserMapper

  // use-cases
  addUserUseCase: IUseCase<IAddUserInput, IUserDTO>
  getUsersUseCase: IUseCase<void, IUserDTO[]>
  getStatsByCountryUseCase: IUseCase<void, ICityStats[]>
  getStatsAverageUseCase: IUseCase<void, ICityStatsAverage[]>
}
