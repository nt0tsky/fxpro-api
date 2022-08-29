import { AwilixContainer } from 'awilix'
import { createServiceContainer } from '../container'
import { IServiceCradle } from '../iface'

export const createServiceMockContainer = (): AwilixContainer<IServiceCradle> => {
  const container = createServiceContainer()

  // todo register mocks

  return container
}
