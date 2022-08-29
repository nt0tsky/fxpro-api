import { IServiceCradle } from '../../../../iface'
import { IUseCase } from '../../../buildingBlocks/IUseCase'
import {
  IUserDTO, IUserMapper, IUserRepo
} from '../../../User'

export class GetUsersUseCase implements IUseCase<void, IUserDTO[]> {
  private readonly userRepo: IUserRepo

  private readonly userMapper: IUserMapper

  constructor({ userRepo, userMapper }: IServiceCradle) {
    this.userRepo = userRepo
    this.userMapper = userMapper
  }

  public execute = async (): Promise<IUserDTO[]> => {
    const users = await this.userRepo.findAll()

    return users.map(this.userMapper.toDTO)
  }
}
