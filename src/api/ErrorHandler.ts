import { NextFunction, Request, Response } from 'express'

export const createErrorHandler = () =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, req: Request, res: Response, _: NextFunction) => {
  // eslint-disable-next-line no-console
    console.log(error.message)

    res.status(500).send(error.message)
  }
