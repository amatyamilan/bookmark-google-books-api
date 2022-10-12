import { PaginationMeta } from 'App/DTOs/PaginationDTO'

export default class Pagination {
  private page: number
  private pageLimit

  constructor(page: number, pageLimit: number, maxPageLimit?: number) {
    this.pageLimit = pageLimit || maxPageLimit || 20
    this.page = page || 1
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
    const last = totalPages
    const next = this.page < totalPages ? this.page + 1 : null
    const previous = this.page > 1 ? this.page - 1 : null
    const self = this.page
    const paginationMeta: PaginationMeta = {
      offset: this.getOffset(),
      self,
      first,
      last,
      next,
      previous,
      count: Number(totalData),
    }

    return paginationMeta
  }
}
