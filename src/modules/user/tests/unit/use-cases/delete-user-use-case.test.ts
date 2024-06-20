import { AppError } from '@/errors/app-error'

import { DeleteUserUsecase } from '@/modules/user/use-cases/delete-user-use-case'

import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { CreateUserUseCase } from '@user/use-cases/create-user-use-case'

let createUserUsecase: CreateUserUseCase
let deleteUserUseCase: DeleteUserUsecase

describe('delete-user-use-case', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    createUserUsecase = new CreateUserUseCase(userRepository)
    deleteUserUseCase = new DeleteUserUsecase(userRepository)

    await createUserUsecase.execute({
      birthDay: new Date(),
      email: 'default-user@email.com',
      name: 'Default User',
      password: '123456',
      surName: 'default-user',
    })
  })

  it('should not be able to delete a user with wrong id', async () => {
    await expect(deleteUserUseCase.execute('wrong-id')).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should be able to delete a user', async () => {
    const deletedUser = await deleteUserUseCase.execute('test-id')

    expect(deletedUser).toHaveProperty('id')
    expect(deletedUser).toHaveProperty('birthDay')
    expect(deletedUser).toHaveProperty('email')
    expect(deletedUser).toHaveProperty('name')
    expect(deletedUser).toHaveProperty('surName')
    expect(deletedUser).toHaveProperty('password')
  })
})
