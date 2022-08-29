import { User } from './User'

export interface IUserWhereParams {
  id: number
}

export interface IUserRepo {
  save: (user: User) => Promise<void>
  findOne: (where: IUserWhereParams) => Promise<User | null>
  findAll: () => Promise<User[]>
  flushAll: () => Promise<void>
}
