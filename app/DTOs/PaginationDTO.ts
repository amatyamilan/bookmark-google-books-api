type Nullable<T> = T | null

export interface PaginateParams {
  readonly page: number
  readonly limit?: number
}
export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: Nullable<string>
  previousPageUrl: Nullable<string>
}
