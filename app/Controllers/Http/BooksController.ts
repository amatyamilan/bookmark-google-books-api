import { inject } from '@adonisjs/core/build/standalone'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import { GoogleBooksService } from 'App/Services/GoogleBooksService'

@inject()
export default class BooksController {
  constructor(private googleBooksService: GoogleBooksService) {}

  public async index({ request }) {
    const filters: BookSearchFilterParams = request.only([
      'title',
      'author',
      'keyword',
      'page',
      'limit',
    ])

    return await this.googleBooksService.search(filters)
  }
}
