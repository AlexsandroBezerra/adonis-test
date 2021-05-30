import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateUserValidator)
    } catch (err) {
      return response.badRequest(err.messages)
    }

    try {
      const userData = request.only(['name', 'email', 'password'])

      const user = await User.create(userData)

      return user
    } catch (err) {
      response.conflict({ error: 'Email provided is used' })
    }
  }

  public async show({ auth }: HttpContextContract) {
    return auth.user
  }
}
