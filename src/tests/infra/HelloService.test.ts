import { HelloService } from '../../infra/HelloService'

describe('HelloService', () => {
  it('Should send valid body', () => {
    const message = new HelloService().getHello()

    expect(message).toEqual('hello')
  })
})
