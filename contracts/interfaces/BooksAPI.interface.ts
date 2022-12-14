import { BookResponse } from 'App/DTOs/BookDTO'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import { PaginateParams, PaginationMeta } from 'App/DTOs/PaginationDTO'

export default interface BooksAPIInterface {
  search(
    filters: BookSearchFilterParams,
    paginationParams: PaginateParams
  ): Promise<{ data: BookResponse[]; paginationMeta: PaginationMeta }>

  getBookDetails(bookApiId: string): Promise<BookResponse>
}
