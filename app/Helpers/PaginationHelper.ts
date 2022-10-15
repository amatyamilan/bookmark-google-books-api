import { PaginationMeta } from 'App/DTOs/PaginationDTO'

export default class Pagination {
  private page: number
  private pageLimit
  private queryParams

  constructor(page: number, pageLimit: number, queryParams?: {}) {
    this.pageLimit = pageLimit || 20
    this.page = Number(page) || 1
    this.queryParams = queryParams
  }

  public getOffset(): number {
    return (this.page - 1) * this.pageLimit
  }

  public getPageLimit(): number {
    return this.pageLimit
  }

  public getPageNos(totalData): PaginationMeta {
    // necessary with page and page size convention
    const totalPages = Math.ceil(totalData / this.pageLimit)
    const first = 1
    const last = totalPages || first
    const next = this.page < totalPages ? this.page + 1 : null
    const previous = this.page > 1 ? this.page - 1 : null
    const self = this.page
    const paginationMeta: PaginationMeta = {
      total: Number(totalData),
      perPage: Number(this.pageLimit),
      currentPage: self,
      lastPage: last,
      firstPage: first,
      firstPageUrl: `/?${new URLSearchParams({ page: first, ...this.queryParams }).toString()}`,
      lastPageUrl: `/?${new URLSearchParams({ page: last, ...this.queryParams }).toString()}`,
      nextPageUrl: next
        ? `/?${new URLSearchParams({ page: next, ...this.queryParams }).toString()}`
        : null,
      previousPageUrl: previous
        ? `/?${new URLSearchParams({ page: previous, ...this.queryParams }).toString()}`
        : null,
    }

    return paginationMeta
  }
}
