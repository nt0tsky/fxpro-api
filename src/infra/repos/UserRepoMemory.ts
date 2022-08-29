import { IUserRepo, User, IUserWhereParams } from '../../domain/User'
import { BaseRepoMemory } from './BaseRepoMemory'

export class UserRepoMemory extends BaseRepoMemory<User> implements IUserRepo {
  public findOne = async (where: IUserWhereParams): Promise<User | null> =>
    (this.hashMap[where.id] ? this.hashMap[where.id] : null)

  public findAll = (): Promise<User[]> =>
    Promise.resolve(Object.values(this.hashMap))

  public flushAll = async (): Promise<void> => {
    this.hashMap = {}
  }
}
