export abstract class Entity<
  TProps,
  TIdentity = string
  > {
  public readonly id: TIdentity

  public readonly props: TProps

  constructor(id: TIdentity, props: TProps) {
    this.id = id
    this.props = props
  }
}
