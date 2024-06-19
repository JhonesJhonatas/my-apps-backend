import { User } from '@prisma/client'

import { ICreateUserDto } from '@user/dto/i-create-user-dto'
import { IUpdateUserDto } from '@user/dto/i-update-user-dto'

export interface IUserRepository {
  create(props: ICreateUserDto): Promise<User>
  update(props: IUpdateUserDto): Promise<User>
  delete(id: string): Promise<User>

  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
