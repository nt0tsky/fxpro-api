import { IHelloService } from '../iface'

export class HelloService implements IHelloService {
  getHello(): string {
    return 'hello'
  }
}
