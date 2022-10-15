import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserBookmarkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bookmarkApiId: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'bookmarkApiId.required': 'Bookmark API id is required.',
  }
}
