import { NextFunction } from 'express'
import { IAddUserInput } from '../../domain/use-cases/user/addUser/addUserInput'
import { IUserDTO } from '../../domain/User'
import { IServiceCradle } from '../../iface'
import {
  BaseController, TRequest, TRequestBody, TResponse
} from './BaseController'

export class UsersController extends BaseController {
  public readonly service: IServiceCradle

  constructor(service: IServiceCradle) {
    super()
    this.service = service
  }

  public addUser = async (
    req: TRequestBody<IAddUserInput>,
    res: TResponse<{ user: IUserDTO }>,
    next: NextFunction
  ): Promise<TResponse<{ user: IUserDTO }>> =>
    this.wrap(async () => {
      const user = await this.service.addUserUseCase.execute(req.body)

      return res.json({
        user
      })
    }, next)

  public getUsers = async (
    req: TRequest,
    res: TResponse<{ users: IUserDTO[] }>,
    next: NextFunction
  ): Promise<TResponse<{ users: IUserDTO[] }>> =>
    this.wrap(async () => {
      const users = await this.service.getUsersUseCase.execute()

      return res.json({
        users
      })
    }, next)
}
