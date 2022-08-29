import { Entity } from '../../domain/buildingBlocks/Entity'

export abstract class BaseRepoMemory<
  TEntity extends Entity<Record<string, any>, number>
  > {
  protected hashMap: Record<string, TEntity> = {}

  public save = async (entity: TEntity): Promise<void> => {
    this.hashMap[entity.id] = entity
  }
}
