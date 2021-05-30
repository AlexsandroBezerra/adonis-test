import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ToDoItems extends BaseSchema {
  protected tableName = 'to_do_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('text').notNullable()
      table.boolean('done').defaultTo(false).notNullable()
      table
        .integer('to_do_list_id')
        .unsigned()
        .references('to_do_lists.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
