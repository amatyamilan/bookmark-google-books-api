import { inject } from '@adonisjs/core/build/standalone'

import { defaultPaginationLimit } from 'Config/app'
import { PaginateParams } from 'App/DTOs/PaginationDTO'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import { GoogleBooksService } from 'App/Services/GoogleBooksService'
import BooksSearchValidator from 'App/Validators/BooksSearchValidator'

@inject()
export default class BooksController {
  constructor(private googleBooksService: GoogleBooksService) {}

  public async index({ request }) {
    await request.validate(BooksSearchValidator)
    const filters: BookSearchFilterParams = request.only(['title', 'author', 'keyword'])

    let paginationParams: PaginateParams = {
      page: request.input('page', 1),
      limit: request.input('limit', defaultPaginationLimit),
    }

    const booksData = await this.googleBooksService.search(filters, paginationParams)

    return { data: booksData.data, meta: booksData.paginationMeta }
  }
}
