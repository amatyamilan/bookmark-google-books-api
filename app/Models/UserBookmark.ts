import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserBookmark extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public userId: number

  @column({ isPrimary: true })
  public booksApiId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
