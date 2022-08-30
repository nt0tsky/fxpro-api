import { Express } from 'express'
import { IServiceCradle } from '../iface'
import { UsersController } from './controllers/UsersController'
import { StatsController } from './controllers/StatsController'
import { createErrorHandler } from './ErrorHandler'

export const createRoutes = (
  app: Express,
  cradle: IServiceCradle
): void => {
  const usersController = new UsersController(cradle)
  const statsController = new StatsController(cradle)
  const errorHandler = createErrorHandler()

  app.post('/users', usersController.addUser)
  app.get('/users', usersController.getUsers)
  app.get('/stats/country', statsController.statsByCountry)
  app.get('/stats/average', statsController.statsAverage)

  app.use(errorHandler)
}
