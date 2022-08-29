import { IUserDTO, User } from './User'

export interface IUserMapper {
  toDTO: (entity: User) => IUserDTO
}
