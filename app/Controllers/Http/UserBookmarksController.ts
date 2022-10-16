import { inject } from '@adonisjs/core/build/standalone'
import { STATUSES } from 'App/constants/responseCodes.status'
import { PaginateParams } from 'App/DTOs/PaginationDTO'
import { GoogleBooksService } from 'App/Services/GoogleBooksService'
import UserBookmarkService from 'App/Services/UserBookmarkService'
import UserBookmarkValidator from 'App/Validators/UserBookmarkValidator'
import { paginationLimit } from 'Config/app'

@inject()
export default class UserBookmarksController {
  constructor(private userBookmarkService: UserBookmarkService) {}

  public async index({ auth, request }) {
    const userInfo = auth.use('api').user
    const { id: userId } = userInfo

    let paginationParams: PaginateParams = {
      page: request.input('page', 1),
      limit: request.input('limit', paginationLimit),
    }

    return this.userBookmarkService.getUserBookmarks(userId, paginationParams)
  }

  public async store({ request, response, auth }) {
    await request.validate(UserBookmarkValidator)

    const userInfo = auth.use('api').user
    const { id: userId } = userInfo
    const booksApiId = request.input('booksApiId')

    try {
      await new GoogleBooksService().getBookDetails(booksApiId)
    } catch (error) {
      return response.status(STATUSES.ERROR_NOT_FOUND_EXCEPTION).send({
        message: 'Invalid books api id',
      })
    }

    const userBookmarkExists = await this.userBookmarkService.checkIfBookmarksExists(userId, [
      booksApiId,
    ])

    if (userBookmarkExists.length) {
      return response.status(STATUSES.ERROR_CONFLICT_EXCEPTION).send({
        message: 'Bookmark already exists.',
      })
    }
    const userBookmark = await this.userBookmarkService.createBookmark(userId, booksApiId)
    userBookmark.extraInformation = JSON.parse(userBookmark.extraInformation)

    return response.status(STATUSES.STATUS_OK).send({
      message: 'Successfully created bookmark.',
      data: userBookmark,
    })
  }

  public async destroy({ request, response, auth }) {
    const userInfo = auth.use('api').user
    const { id: userId } = userInfo

    const bookmarkApiId = request.param('bookmarkApiId')

    const userBookmarkExists = await this.userBookmarkService.checkIfBookmarksExists(userId, [
      bookmarkApiId,
    ])

    if (!userBookmarkExists.length) {
      return response.status(STATUSES.ERROR_NOT_FOUND_EXCEPTION).send({
        message: 'Invalid bookmark API id',
      })
    }

    await this.userBookmarkService.deleteBookmark(userId, bookmarkApiId)

    return response.status(STATUSES.STATUS_OK).send({
      message: 'Successfully deleted bookmark.',
    })
  }
}
