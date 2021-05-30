import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async create({ auth, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const token = auth.attempt(email, password)

    return token
  }
}
