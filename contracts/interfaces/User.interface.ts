import { UserDTO } from 'App/DTOs/UserDTO'
import User from 'App/Models/User'

export default interface UserInterface {
  create(userDetails: UserDTO): Promise<User>

  findUserByEmail(email: string): Promise<User>
}
