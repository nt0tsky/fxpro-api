import { Request, Response } from 'express'
import {
  Query, Send, ParamsDictionary
} from 'express-serve-static-core'

export interface TRequestBody<TBody> extends Request {
  body: TBody
}

export interface TRequestQuery<TQuery extends Query = Record<string, string>> extends Request {
  query: TQuery
}

export interface TRequestParams<TParams extends ParamsDictionary> extends Request {
  params: TParams
}

export interface TRequest
<
  TQuery extends Query = Record<string, string>,
  TBody = unknown,
  TParams extends ParamsDictionary = Record<string, string>
  > extends Request {
  query: TQuery
  body: TBody
  params: TParams
}

export interface TResponse<TJSONBody> extends Response {
  json: Send<TJSONBody, this>
}

export abstract class BaseController {

}
