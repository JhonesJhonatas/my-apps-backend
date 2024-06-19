import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from '@user/repository/i-user-repository'

import { ICreateUserDto } from '@user/dto/i-create-user-dto'
import { IUpdateUserDto } from '@user/dto/i-update-user-dto'

const prismaClient = new PrismaClient()

export class UserRepository implements IUserRepository {
  async create(props: ICreateUserDto): Promise<User> {
    return await prismaClient.user.create({
      data: {
        ...props,
      },
    })
  }

  async update(props: IUpdateUserDto): Promise<User> {
    const { id, ...data } = props

    return await prismaClient.user.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    return await prismaClient.user.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    })
  }
}
