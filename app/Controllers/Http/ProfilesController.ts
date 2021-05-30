import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'

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

  public async uploadAvatar({ request, response }: HttpContextContract) {
    const image = request.file('avatar', {
      extnames: ['jpg', 'png'],
      size: '2mb',
    })

    if (!image) {
      return response.badRequest({ error: 'file not provided' })
    }

    if (!image.isValid) {
      return image.errors
    }

    if (image) {
      const { profileId } = request.only(['profileId'])

      const profile = await Profile.find(profileId)

      if (!profile) {
        return response.badRequest({ error: 'profileId provided is invalid' })
      }

      const fileName = `${cuid()}.${image.extname}`

      profile.avatar = fileName
      await profile.save()

      await image.move(Application.tmpPath('uploads'), {
        name: fileName,
        overwrite: true,
      })
    }
  }
}
