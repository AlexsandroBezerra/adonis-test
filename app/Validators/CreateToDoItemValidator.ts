import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateToDoItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    text: schema.string({ trim: true }),
  })

  public messages = {}
}
