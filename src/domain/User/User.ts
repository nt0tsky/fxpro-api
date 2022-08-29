import { Entity } from '../buildingBlocks/Entity'
import { IAddUserEntityInput, userCreateEntityValidate } from './UserValidator'

export interface IUserProps {
  name: string
  country: string
  earnings: string
}

export interface IUserDTO extends IUserProps {
  id: number
}

export class User extends Entity<IUserProps, number> {
  get earningsWithoutCurrency(): number {
    return Number(this.props.earnings.slice(1))
  }

  get country(): string {
    return this.props.country
  }

  public static create = (props: IAddUserEntityInput): User => {
    userCreateEntityValidate(props)

    return new User(props.id, {
      name: props.name,
      country: props.country,
      earnings: props.earnings
    })
  }
}
