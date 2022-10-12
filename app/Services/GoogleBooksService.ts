import axios from 'axios'
import { BookResponse } from 'App/DTOs/BookDTO'
import { BookSearchFilterParams } from 'App/DTOs/FilterDTO'
import BooksAPIInterface from 'Contracts/interfaces/BooksAPI.interface'
import { inject } from '@adonisjs/core/build/standalone'
import { googleBooksApiKey } from 'Config/app'

@inject()
export class GoogleBooksService implements BooksAPIInterface {
  public async search(filters: BookSearchFilterParams): Promise<BookResponse[]> {
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

    try {
      const booksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: searchQuery,
          key: googleBooksApiKey,
        },
      })

      const books: BookResponse[] = booksResponse.data

      return books
    } catch (searchError) {
      console.error('Error while searching books')

      throw searchError
    }
  }
}
