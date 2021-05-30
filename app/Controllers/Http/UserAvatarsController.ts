import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'
import UploadUserAvatarValidator from 'App/Validators/UploadUserAvatarValidator'

export default class UserAvatarsController {
  public async create({ auth, request, response }: HttpContextContract) {
    const { user } = auth

    if (!user) {
      return response.unauthorized({ error: 'token not provided' })
    }

    try {
      await request.validate(UploadUserAvatarValidator)
    } catch (err) {
      return response.badRequest(err.messages)
    }

    const image = request.file('avatar')

    if (image) {
      const fileName = `${cuid()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: fileName,
        overwrite: true,
      })

      if (user.avatar) {
        await fs.promises.rm(Application.tmpPath('uploads', user.avatar))
      }

      user.avatar = fileName
      await user.save()
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
