import { IServiceCradle } from '../../../../iface'
import { IUseCase } from '../../../buildingBlocks/IUseCase'
import {
  IUserDTO, IUserMapper, IUserRepo, User
} from '../../../User'
import { IAddUserInput } from './addUserInput'

export class AddUserUseCase implements IUseCase<IAddUserInput, IUserDTO> {
  private readonly userRepo: IUserRepo

  private readonly userMapper: IUserMapper

  constructor({ userRepo, userMapper }: IServiceCradle) {
    this.userRepo = userRepo
    this.userMapper = userMapper
  }

  public execute = async (payload: IAddUserInput): Promise<IUserDTO> => {
    const userDB = await this.userRepo.findOne({ id: payload.id })
    if (userDB) throw new Error('user with same id is already exists')

    const user = User.create(payload)

    await this.userRepo.save(user)

    return this.userMapper.toDTO(user)
  }
}
