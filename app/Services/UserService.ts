import { UserDTO } from 'App/DTOs/UserDTO'
import User from 'App/Models/User'
import UserInterface from 'Contracts/interfaces/User.interface'
import { inject } from '@adonisjs/fold'

@inject()
export default class UserService implements UserInterface {
  public async create(userDetails: UserDTO): Promise<User | Error> {
    try {
      const user = await User.create(userDetails)
      return user
    } catch (userCreateError) {
      throw userCreateError
    }
  }
}
