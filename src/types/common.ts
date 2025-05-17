
export type ResponseType<T> = {
    message: string
    totalCount?: number
    total?: number
    page?: number
    pageSize?: number
    data: T
  }