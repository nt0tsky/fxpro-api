import { IUserDTO, IUserMapper, User } from '../../domain/User'

export class UserMapper implements IUserMapper {
  toDTO(entity: User): IUserDTO {
    return {
      id: entity.id,
      ...entity.props
    }
  }
}
