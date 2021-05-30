import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import ToDoList from 'App/Models/ToDoList'

export default class ToDoListsController {
  public async index({ request }: HttpContextContract) {
    const qs = request.qs()
    const profileId = +qs.profileId

    const toDoLists = ToDoList.query().where('profile_id', profileId)

    return toDoLists
  }

  public async create({ request, response }: HttpContextContract) {
    const { name, profileId } = request.only(['name', 'profileId'])

    const profile = await Profile.find(profileId)

    if (!profile) {
      return response.badRequest({ error: 'profileId provided is invalid' })
    }

    const toDoList = await profile.related('toDoLists').create({ name })

    return toDoList
  }
}
