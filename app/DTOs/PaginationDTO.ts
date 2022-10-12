type Nullable<T> = T | null

export interface PaginateParams {
  page: number
  limit?: number
}

export interface PaginationMeta {
  offset: number
  self: number
  first: number
  last: number
  next: Nullable<number>
  previous: Nullable<number>
  count: number
}
