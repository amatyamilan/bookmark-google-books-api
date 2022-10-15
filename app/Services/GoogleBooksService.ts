import axios from 'axios'
import { BookResponse } from 'App/DTOs/BookDTO'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import BooksAPIInterface from 'Contracts/interfaces/BooksAPI.interface'
import { inject } from '@adonisjs/core/build/standalone'
import { googleBooksApiKey } from 'Config/app'
import { PaginateParams, PaginationMeta } from 'App/DTOs/PaginationDTO'
import Pagination from 'App/Helpers/PaginationHelper'

@inject()
export class GoogleBooksService implements BooksAPIInterface {
  public async search(
    filters: BookSearchFilterParams,
    paginationParams: PaginateParams
  ): Promise<{ data: BookResponse[]; paginationMeta: PaginationMeta }> {
    let searchQuery = ''

    if (filters.keyword) {
      searchQuery += `${filters.keyword}+`
    }

    if (filters.title) {
      searchQuery += `intitle:${filters.title}`
    }

    if (filters.author) {
      searchQuery += `inauthor:${filters.author}`
    }

    const pagination = new Pagination(paginationParams.page, paginationParams.limit || 40, filters)
    const startIndex = pagination.getOffset()

    try {
      const booksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: searchQuery,
          key: googleBooksApiKey,
          maxResults: paginationParams.limit,
          startIndex,
        },
      })

      const paginationMeta: PaginationMeta = pagination.getPageNos(booksResponse.data.totalItems)
      const data: BookResponse[] = booksResponse.data.items

      return { data, paginationMeta }
    } catch (searchError) {
      console.error('Error while searching books')

      throw searchError
    }
  }
}
