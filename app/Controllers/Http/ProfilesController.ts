import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profile from 'App/Models/Profile'
import CreateProfileValidator from 'App/Validators/CreateProfileValidator'

export default class ProfilesController {
  public async create({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateProfileValidator)
    } catch (err) {
      return response.badRequest(err.messages)
    }

    try {
      const profileData = request.only(['name', 'email'])

      const profile = await Profile.create(profileData)

      return profile
    } catch (err) {
      response.conflict({ error: 'Email provided is used' })
    }
  }
}
