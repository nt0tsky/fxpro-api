import { IHelloService, IServiceCradle } from '../../iface'
import {
  BaseController, TRequest, TResponse
} from './BaseController'

export default class HelloController extends BaseController {
  private readonly helloService: IHelloService

  constructor({ helloService }: IServiceCradle) {
    super()
    this.helloService = helloService
  }

  public hello = (req: TRequest, res: TResponse<{ data: string }>): TResponse<{ data: string }> => {
    const data = this.helloService.getHello()

    return res.json({
      data
    }).sendStatus(200)
  }
}
