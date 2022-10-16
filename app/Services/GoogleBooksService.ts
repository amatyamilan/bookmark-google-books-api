import axios from 'axios'
import { inject, Response } from '@adonisjs/core/build/standalone'

import { googleBooksApiKey } from 'Config/app'
import { BookResponse } from 'App/DTOs/BookDTO'
import Pagination from 'App/Helpers/PaginationHelper'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import BooksAPIInterface from 'Contracts/interfaces/BooksAPI.interface'
import { PaginateParams, PaginationMeta } from 'App/DTOs/PaginationDTO'
import Redis from '@ioc:Adonis/Addons/Redis'

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

    const bookSearchParams = {
      q: searchQuery,
      key: googleBooksApiKey,
      maxResults: paginationParams.limit,
      startIndex,
    }

    try {
      const base64EncodedBooksSearchParms = Buffer.from(JSON.stringify(bookSearchParams)).toString(
        'base64'
      )

      const redisBooksResponse = await Redis.get(base64EncodedBooksSearchParms)
      if (redisBooksResponse) {
        return JSON.parse(redisBooksResponse)
      }

      const booksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: bookSearchParams,
      })

      const paginationMeta: PaginationMeta = pagination.getPageNos(booksResponse.data.totalItems)
      const data: BookResponse[] = booksResponse.data.items
      const response = { data, paginationMeta }

      Redis.setex(base64EncodedBooksSearchParms, 1800, JSON.stringify(response))

      return { data, paginationMeta }
    } catch (searchError) {
      console.error('Error while searching books')

      throw searchError
    }
  }

  public async getBookDetails(bookApiId: string): Promise<BookResponse> {
    try {
      const redisBookeKey = `books:${bookApiId}`
      const redisBooksResponse = await Redis.get(redisBookeKey)

      if (redisBooksResponse) {
        return JSON.parse(redisBooksResponse)
      }

      const bookResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookApiId}`,
        {
          params: {
            key: googleBooksApiKey,
          },
        }
      )
      Redis.setex(redisBookeKey, 1800, JSON.stringify(bookResponse.data))

      return bookResponse.data
    } catch (searchError) {
      console.error('Error while searching books')

      throw searchError
    }
  }
}
