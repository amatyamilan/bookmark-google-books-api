import CreateUser from 'App/Validators/CreateUserValidator'
import { inject } from '@adonisjs/fold'
import UserService from 'App/Services/UserService'

@inject()
export default class AuthController {
  constructor(private userService: UserService) {}

  public async signup({ request }) {
    try {
      const data = await request.validate(CreateUser)

      const user = await this.userService.create(data)
      return user
    } catch (signupError) {
      console.error('Error while signing up')

      throw signupError
    }
  }
}
