import { AwilixContainer } from 'awilix'
import { createExpressServer, Express } from './api'
import { IServiceCradle } from './iface'

export const createService = (container: AwilixContainer<IServiceCradle>): Express =>
  container.build<Express>(createExpressServer)
