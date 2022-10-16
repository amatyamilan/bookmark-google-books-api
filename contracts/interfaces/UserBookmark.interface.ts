import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import { PaginateParams } from 'App/DTOs/PaginationDTO'
import UserBookmark from 'App/Models/UserBookmark'

export default interface UserBookmarkInterface {
  getUserBookmarks(
    userId: number,
    paginationParams: PaginateParams
  ): Promise<ModelPaginatorContract<UserBookmark>>

  checkIfBookmarksExists(userId: number, booksApiIds: Array<number>): Promise<Array<UserBookmark>>

  createBookmark(userId: number, booksApiId: string): Promise<UserBookmark>

  deleteBookmark(userId: number, booksApiId: string): Promise<void>
}
