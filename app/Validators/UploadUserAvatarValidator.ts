import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UploadUserAvatarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.file({
      extnames: ['jpg', 'png'],
      size: '2mb',
    }),
  })

  public messages = {}
}
