import { IUserRepository } from '@user/repository/i-user-repository'

import { User } from '@prisma/client'

import { ICreateUserDto } from '@user/dto/i-create-user-dto'
import { IUpdateUserDto } from '@user/dto/i-update-user-dto'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: 'test-id',
      birthDay: new Date(),
      email: 'test-id@email.com',
      name: 'Test User',
      password: '123456',
      surName: 'test-user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'tester',
      birthDay: new Date(),
      email: 'tester@email.com',
      name: 'Tester',
      password: '123456',
      surName: 'tester',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'tester2',
      birthDay: new Date(),
      email: 'tester2@email.com',
      name: 'Tester2',
      password: '123456',
      surName: 'tester2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  create(props: ICreateUserDto): Promise<User> {
    const userToCreate = {
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(userToCreate)

    const createdUser = this.users.find((user) => user.id === userToCreate.id)

    return Promise.resolve(createdUser as User)
  }

  update(props: IUpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === props.id)

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...props,
      updatedAt: new Date(),
    }

    const updatedUser = this.users.find((user) => user.id === props.id)

    return Promise.resolve(updatedUser as User)
  }

  delete(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id)

    const deletedUser = this.users[userIndex]

    this.users.splice(userIndex, 1)

    return Promise.resolve(deletedUser)
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    return Promise.resolve(user || null)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return Promise.resolve(user || null)
  }
}
