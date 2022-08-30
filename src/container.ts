import {
  asClass, AwilixContainer, createContainer
} from 'awilix'
import { AddUserUseCase } from './domain/use-cases/user/addUser/addUserUseCase'
import { GetStatsAverageUseCase } from './domain/use-cases/user/getStatsAverage/getStatsAverage'
import { GetStatsByCountryUseCase } from './domain/use-cases/user/getStatsByCountry/getStatsByCountryUseCase'
import { GetUsersUseCase } from './domain/use-cases/user/getUsers/getUserDetailsUseCase'
import { IServiceCradle } from './iface'
import { UserMapper } from './infra/mappers/UserMapper'
import MemoryCacheManager from './infra/MemoryCacheManager'
import { UserRepoMemory } from './infra/repos/UserRepoMemory'

export const createServiceContainer = (): AwilixContainer<IServiceCradle> => {
  const container = createContainer<IServiceCradle>({
    injectionMode: 'PROXY'
  })

  container.register({
    cacheManager: asClass(MemoryCacheManager).singleton()
  })

  container.register({
    userRepo: asClass(UserRepoMemory).singleton(),
    userMapper: asClass(UserMapper).singleton()
  })

  container.register({
    addUserUseCase: asClass(AddUserUseCase).singleton(),
    getUsersUseCase: asClass(GetUsersUseCase).singleton(),
    getStatsByCountryUseCase: asClass(GetStatsByCountryUseCase).singleton(),
    getStatsAverageUseCase: asClass(GetStatsAverageUseCase).singleton()
  })

  return container
}
