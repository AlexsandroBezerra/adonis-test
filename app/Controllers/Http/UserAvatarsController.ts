import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'

export default class UserAvatarsController {
  public async create({ auth, request, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized({ error: 'token not provided' })
    }

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
      const profile = auth.user
      const fileName = `${cuid()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: fileName,
        overwrite: true,
      })

      if (profile.avatar) {
        await fs.promises.rm(Application.tmpPath('uploads', profile.avatar))
      }

      profile.avatar = fileName
      await profile.save()
    }

    response.noContent()
  }

  public async delete({ auth, response }: HttpContextContract) {
    const { user } = auth

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    if (user.avatar) {
      const avatarPath = Application.tmpPath('uploads', user.avatar)

      user.avatar = null
      await user.save()

      await fs.promises.rm(avatarPath)
    }

    return response.noContent
  }
}
