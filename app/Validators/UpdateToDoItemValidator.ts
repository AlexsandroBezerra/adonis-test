import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateToDoItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    text: schema.string.optional({ trim: true }),
    done: schema.boolean.optional(),
  })

  public messages = {}
}
