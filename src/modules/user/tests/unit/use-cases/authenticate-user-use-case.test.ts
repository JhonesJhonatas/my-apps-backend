import { AppError } from '@/errors/app-error'
import { CreateUserUseCase } from '@/modules/user/use-cases/create-user-use-case'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { AuthenticateUserUseCase } from '@user/use-cases/authenticate-user-use-case'

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUsecase: CreateUserUseCase

describe('authenticate-user-use-case', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    createUserUsecase = new CreateUserUseCase(userRepository)

    await createUserUsecase.execute({
      birthDay: new Date(),
      email: 'user-auth@email.com',
      name: 'User Auth',
      password: '123456',
      surName: 'user-auth',
    })
  })

  it('should not be able to authenticate user with incorrect email', async () => {
    const userData = {
      email: 'incorrectEmail@example.com',
      password: 'senha123',
    }

    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError('User Or Password Incorrect', 404),
    )
  })

  it('should not be able to authenticate user with incorrect password', async () => {
    const userData = {
      email: 'test-id@email.com',
      password: 'incorrectPassword',
    }

    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError('User Or Password Incorrect', 404),
    )
  })

  it('should be able to authenticate user with correct credentials', async () => {
    const userData = {
      name: 'User Auth',
      email: 'user-auth@email.com',
      password: '123456',
    }

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    })

    expect(authenticatedUser).toHaveProperty('token')
    expect(authenticatedUser.user.name).toBe(userData.name)
    expect(authenticatedUser.user.email).toBe(userData.email)
  })
})
