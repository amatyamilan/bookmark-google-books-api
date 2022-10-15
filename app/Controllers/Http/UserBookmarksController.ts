import { inject } from '@adonisjs/core/build/standalone'
import { STATUSES } from 'App/constants/responseCodes.status'
import UserBookmarkService from 'App/Services/UserBookmarkService'
import UserBookmarkValidator from 'App/Validators/UserBookmarkValidator'

@inject()
export default class UserBookmarksController {
  constructor(private userBookmarkService: UserBookmarkService) {}

  public async index({ auth }) {
    const userInfo = auth.use('api').user
    const { id: userId } = userInfo

    return this.userBookmarkService.getUserBookmarks(userId)
  }

  public async store({ request, response, auth }) {
    await request.validate(UserBookmarkValidator)

    const userInfo = auth.use('api').user
    const { id: userId } = userInfo

    const bookmarkApiId = request.input('bookmarkApiId')
    const userBookmarkExists = await this.userBookmarkService.checkIfBookmarksExists(userId, [
      bookmarkApiId,
    ])

    if (userBookmarkExists.length) {
      return response.status(STATUSES.ERROR_CONFLICT_EXCEPTION).send({
        message: 'Bookmark already exists.',
      })
    }
    const userBookmark = await this.userBookmarkService.createBookmark(userId, bookmarkApiId)

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
