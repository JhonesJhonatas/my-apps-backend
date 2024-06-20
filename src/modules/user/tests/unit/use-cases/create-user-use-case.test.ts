import { AppError } from '@/errors/app-error'
import { ICreateUserDto } from '@/modules/user/dto/i-create-user-dto'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { CreateUserUseCase } from '@user/use-cases/create-user-use-case'

let createUserUsecase: CreateUserUseCase

describe('create-user-use-case', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    createUserUsecase = new CreateUserUseCase(userRepository)

    await createUserUsecase.execute({
      birthDay: new Date(),
      email: 'default-user@email.com',
      name: 'Default User',
      password: '123456',
      surName: 'default-user',
    })
  })

  it('should not be able to create a user with a already registered email', async () => {
    const userToCreate: ICreateUserDto = {
      birthDay: new Date(),
      email: 'default-user@email.com',
      name: 'Tester',
      password: '123456',
      surName: 'tester',
    }

    await expect(createUserUsecase.execute(userToCreate)).rejects.toEqual(
      new AppError('Email already registered', 400),
    )
  })

  it('should be able to create a user with complete data', async () => {
    const userToCreate: ICreateUserDto = {
      birthDay: new Date(),
      email: 'new-user@email.com',
      name: 'New User',
      password: '123456',
      surName: 'tester',
    }

    const createdUser = await createUserUsecase.execute(userToCreate)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser).toHaveProperty('birthDay')
    expect(createdUser).toHaveProperty('email')
    expect(createdUser).toHaveProperty('name')
    expect(createdUser).toHaveProperty('surName')
    expect(createdUser).toHaveProperty('password')
  })
})
