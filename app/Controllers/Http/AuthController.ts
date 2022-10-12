import CreateUser from 'App/Validators/CreateUserValidator'
import { inject } from '@adonisjs/fold'
import UserService from 'App/Services/UserService'
import Hash from '@ioc:Adonis/Core/Hash'

@inject()
export default class AuthController {
  constructor(private userService: UserService) {}

  public async signup({ request }) {
    const data = await request.validate(CreateUser)

    const user = await this.userService.create(data)
    return user
  }

  public async signin({ auth, request, response }) {
    const { email, password } = request.all()

    if (await auth.attempt(email, password)) {
      let user = await this.userService.findUserByEmail(email)

      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }

      let token = await auth.use('api').generate(user)

      return token
    }
  }
}
