import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ToDoList from 'App/Models/ToDoList'

export default class ToDoListsController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const profileId = auth.user.id
    const toDoLists = ToDoList.query().where('profile_id', profileId)

    return toDoLists
  }

  public async create({ auth, request, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const { name } = request.only(['name'])
    const toDoList = await auth.user.related('toDoLists').create({ name })

    return toDoList
  }
}
