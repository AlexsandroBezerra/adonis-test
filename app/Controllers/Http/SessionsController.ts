import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSessionValidator from 'App/Validators/CreateSessionValidator'

export default class SessionsController {
  public async create({ auth, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateSessionValidator)
    } catch (err) {
      return response.badRequest(err.messages)
    }

    const { email, password } = request.only(['email', 'password'])

    const token = auth.attempt(email, password)

    return token
  }
}
