import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ToDoList from 'App/Models/ToDoList'
import CreateToDoListValidator from 'App/Validators/CreateToDoListValidator'

export default class ToDoListsController {
  public async index({ auth, response }: HttpContextContract) {
    const { user } = auth

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const toDoLists = ToDoList.query().where('user_id', user.id)

    return toDoLists
  }

  public async create({ auth, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateToDoListValidator)
    } catch (err) {
      return response.badRequest(err.messages)
    }

    const { user } = auth

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const { name } = request.only(['name'])
    const toDoList = await user.related('toDoLists').create({ name })

    return toDoList
  }
}
