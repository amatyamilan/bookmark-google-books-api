import { inject } from '@adonisjs/fold'

import User from 'App/Models/User'
import { UserDTO } from 'App/DTOs/UserDTO'
import UserInterface from 'Contracts/interfaces/User.interface'

@inject()
export default class UserService implements UserInterface {
  public async create(userDetails: UserDTO): Promise<User> {
    try {
      const user = await User.create(userDetails)

      return user
    } catch (userCreateError) {
      throw userCreateError
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await User.findByOrFail('email', email)

      return user
    } catch (findUserByEmailError) {
      throw findUserByEmailError
    }
  }
}
