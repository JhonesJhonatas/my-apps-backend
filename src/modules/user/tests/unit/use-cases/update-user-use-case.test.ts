import { AppError } from '@/errors/app-error'
import { IUpdateUserDto } from '@/modules/user/dto/i-update-user-dto'

import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { UpdateUserUseCase } from '@user/use-cases/update-user-use-case'

let updateUserUseCase: UpdateUserUseCase

describe('update-user-use-case', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    updateUserUseCase = new UpdateUserUseCase(userRepository)
  })

  it('should not be able to update a user with a wrong id', async () => {
    const userTopUpdate: IUpdateUserDto = {
      id: 'wrong-id',
      name: 'Updated User',
    }

    await expect(updateUserUseCase.execute(userTopUpdate)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should not be able to update a user with a duplicate email', async () => {
    const userTopUpdate: IUpdateUserDto = {
      id: 'tester',
      name: 'Updated User',
      email: 'tester2@email.com',
    }

    await expect(updateUserUseCase.execute(userTopUpdate)).rejects.toEqual(
      new AppError('Email already registered', 400),
    )
  })

  it('should be able to update a user without complete data', async () => {
    const userTopUpdate: IUpdateUserDto = {
      id: 'tester',
      name: 'Updated User',
    }

    const updatedUser = await updateUserUseCase.execute(userTopUpdate)

    expect(updatedUser).toHaveProperty('id')
    expect(updatedUser).toHaveProperty('birthDay')
    expect(updatedUser).toHaveProperty('email')
    expect(updatedUser).toHaveProperty('name')
    expect(updatedUser).toHaveProperty('surName')
    expect(updatedUser).toHaveProperty('password')
  })

  it('should be able to update a user with complete data', async () => {
    const userTopUpdate: IUpdateUserDto = {
      id: 'tester2',
      name: 'Updated User',
      email: 'tester2@email.com',
      birthDay: new Date(),
      password: '123456',
      surName: 'updated-user',
    }

    const updatedUser = await updateUserUseCase.execute(userTopUpdate)

    expect(updatedUser).toHaveProperty('id')
    expect(updatedUser).toHaveProperty('birthDay')
    expect(updatedUser).toHaveProperty('email')
    expect(updatedUser).toHaveProperty('name')
    expect(updatedUser).toHaveProperty('surName')
    expect(updatedUser).toHaveProperty('password')
  })
})
