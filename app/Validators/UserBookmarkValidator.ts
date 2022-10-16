import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserBookmarkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    booksApiId: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'booksApiId.required': 'Books API id is required.',
  }
}
