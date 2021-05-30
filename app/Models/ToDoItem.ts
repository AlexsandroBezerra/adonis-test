import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ToDoItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column({ serialize: (value) => !!value })
  public done: boolean

  @column()
  public to_do_list_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
