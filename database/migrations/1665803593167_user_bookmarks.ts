import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_bookmarks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('books_api_id', 20)
      table.integer('user_id')
      table.primary(['user_id', 'books_api_id'])
      table.jsonb('extra_information')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
