export interface IUseCase<TIn, TOut> {
  execute: (payload: TIn) => Promise<TOut>
}

// export type ExecuteOf<T extends IUseCase> = T['execute']
