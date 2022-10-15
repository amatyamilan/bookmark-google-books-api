import User from 'App/Models/User'
import { UserDTO } from 'App/DTOs/UserDTO'

export default interface UserInterface {
  create(userDetails: UserDTO): Promise<User>

  findUserByEmail(email: string): Promise<User>
}
