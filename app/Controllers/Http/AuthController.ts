// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'

export default class AuthController {
  /**
   * signup
   */
  public async signup({ request, response }) {
    const data = await request.validate(CreateUser)

    const user = await User.create(data)

    return user
  }
}
