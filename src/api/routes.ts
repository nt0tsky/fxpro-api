import { Express } from 'express'
import { IServiceCradle } from '../iface'
import HelloController from './controllers/HelloController'
import { UsersController } from './controllers/UsersController'
import { UsersStatsController } from './controllers/UsersStatsController'

export const createRoutes = (
  app: Express,
  cradle: IServiceCradle
): void => {
  const helloController = new HelloController(cradle)
  const usersController = new UsersController(cradle)
  const usersStatsController = new UsersStatsController(cradle)

  app.get('/hello', helloController.hello)
  app.post('/users', usersController.addUser)
  app.get('/users', usersController.getUsers)
  app.get('/statsByCountry', usersStatsController.statsByCountry)
  app.get('/statsAverage', usersStatsController.statsAverage)
}
