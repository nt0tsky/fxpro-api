import Joi from 'joi'

export interface IAddUserEntityInput {
  id: number
  earnings: string
  country: string
  name: string
}

export const userCreateEntityValidate = (props: IAddUserEntityInput) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    country: Joi.string().required(),
    earnings: Joi.string().required()
  })

  const { error } = schema.validate(props, { abortEarly: false })
  if (error) throw new Error(error.message)
}
