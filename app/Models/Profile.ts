import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import ToDoList from './ToDoList'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({
    serialize(value) {
      return value ? `http://localhost:3333/uploads/${value}` : null
    },
  })
  public avatar: string | null

  @hasMany(() => ToDoList, { foreignKey: 'profile_id' })
  public toDoLists: HasMany<typeof ToDoList>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Profile) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
