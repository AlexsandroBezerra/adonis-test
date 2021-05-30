import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ToDoItemsController {
  public async index({ auth, request, response }: HttpContextContract) {
    const { user } = auth
    const { id } = request.params()

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const toDoList = await user
      .related('toDoLists')
      .query()
      .where('user_id', user.id)
      .where('id', id)
      .first()

    if (!toDoList) {
      return response.badRequest({ error: 'Invalid to do list' })
    }

    const items = toDoList.related('toDoItems').query().where('to_do_list_id', toDoList.id)

    return items
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const { user } = auth
    const { id } = request.params()
    const { text } = request.only(['text'])

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const toDoList = await user
      .related('toDoLists')
      .query()
      .where('user_id', user.id)
      .where('id', id)
      .first()

    if (!toDoList) {
      return response.badRequest({ error: 'Invalid to do list' })
    }

    const toDoItem = await toDoList.related('toDoItems').create({ text })

    return toDoItem
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const { user } = auth
    const { id, itemId } = request.params()
    const { text, done } = request.only(['text', 'done'])

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const toDoList = await user
      .related('toDoLists')
      .query()
      .where('user_id', user.id)
      .where('id', id)
      .first()

    if (!toDoList) {
      return response.badRequest({ error: 'Invalid to do list' })
    }

    const toDoItem = await toDoList.related('toDoItems').query().where('id', itemId).first()

    if (!toDoItem) {
      return response.notFound({ error: 'item id provided not found' })
    }

    if (text) {
      toDoItem.text = text
    }

    if (typeof done !== 'undefined') {
      toDoItem.done = done
    }

    await toDoItem.save()

    return toDoItem
  }

  public async delete({ auth, request, response }: HttpContextContract) {
    const { user } = auth
    const { id, itemId } = request.params()

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    const toDoList = await user
      .related('toDoLists')
      .query()
      .where('user_id', user.id)
      .where('id', id)
      .first()

    if (!toDoList) {
      return response.badRequest({ error: 'Invalid to do list' })
    }

    await toDoList.related('toDoItems').query().where('id', itemId).delete()

    return response.noContent()
  }
}
