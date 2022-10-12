import { BookResponse } from 'App/DTOs/BookDTO'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'

export default interface BooksAPIInterface {
  search(filters: BookSearchFilterParams): Promise<BookResponse[]>
}
