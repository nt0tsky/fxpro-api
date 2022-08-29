import { IAddUserInput } from '../../domain/use-cases/user/addUser/addUserInput'
import { IUserDTO } from '../../domain/User'
import { IServiceCradle } from '../../iface'
import {
  BaseController, TRequest, TRequestBody, TResponse
} from './BaseController'

export class UsersController extends BaseController {
  protected readonly service: IServiceCradle

  constructor(service: IServiceCradle) {
    super()
    this.service = service
  }

  public addUser = async (
    req: TRequestBody<IAddUserInput>,
    res: TResponse<{ user: IUserDTO }>
  ): Promise<TResponse<{ user: IUserDTO }>> => {
    const user = await this.service.addUserUseCase.execute(req.body)

    return res.json({
      user
    })
  }

  public getUsers = async (
    req: TRequest,
    res: TResponse<{ users: IUserDTO[] }>
  ): Promise<TResponse<{ users: IUserDTO[] }>> => {
    const users = await this.service.getUsersUseCase.execute()

    return res.json({
      users
    })
  }
}
