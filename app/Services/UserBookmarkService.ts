import { inject } from '@adonisjs/core/build/standalone'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

import UserBookmark from 'App/Models/UserBookmark'
import { PaginateParams } from 'App/DTOs/PaginationDTO'
import { GoogleBooksService } from './GoogleBooksService'
import UserBookmarkInterface from 'Contracts/interfaces/UserBookmark.interface'

@inject()
export default class UserBookmarkService implements UserBookmarkInterface {
  public async getUserBookmarks(
    userId: number,
    paginationParams: PaginateParams
  ): Promise<ModelPaginatorContract<UserBookmark>> {
    try {
      const userBookmarks = await UserBookmark.query()
        .where('userId', userId)
        .paginate(paginationParams.page, paginationParams.limit)

      return userBookmarks
    } catch (getUserBookmarksError) {
      console.error('Error while fetching user bookmarks', getUserBookmarksError.message)

      throw getUserBookmarksError
    }
  }

  public async checkIfBookmarksExists(
    userId: number,
    booksApiIds: Array<number>
  ): Promise<Array<UserBookmark>> {
    const userBookmarks = await UserBookmark.query()
      .where('userId', userId)
      .whereIn('booksApiId', booksApiIds)

    return userBookmarks
  }

  public async createBookmark(userId: number, booksApiId: string): Promise<UserBookmark> {
    try {
      const exptraInformation = await new GoogleBooksService().getBookDetails(booksApiId)
      return await UserBookmark.create({
        userId,
        booksApiId,
        extraInformation: JSON.stringify(exptraInformation),
      })
    } catch (createBookmarkError) {
      console.error('Error while creating bookmark', createBookmarkError.message)

      throw createBookmarkError
    }
  }

  public async deleteBookmark(userId: number, booksApiId: string): Promise<void> {
    try {
      await UserBookmark.query().where('userId', userId).andWhere('booksApiId', booksApiId).delete()
    } catch (deleteBookmarkError) {
      console.error('Error while creating bookmark', deleteBookmarkError.message)

      throw deleteBookmarkError
    }
  }
}
