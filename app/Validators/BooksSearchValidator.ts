import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksSearchValidator {
  private requiredMessage = 'Any one of the field is required, title, author or keyword'
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [
      rules.requiredIfNotExistsAll(['author', 'keyword']),
    ]),
    author: schema.string.optional({ trim: true }, [
      rules.requiredIfExistsAll(['title', 'keyword']),
    ]),
    keyword: schema.string.optional({ trim: true }, [
      rules.requiredIfExistsAll(['author', 'title']),
    ]),

    page: schema.number.optional(),
    limit: schema.number.optional([rules.range(1, 40)]),
  })

  public messages: CustomMessages = {
    'title.requiredIfNotExistsAll': this.requiredMessage,
    'limit.range': 'Limit must be in range of 1 to 40',
  }
}
