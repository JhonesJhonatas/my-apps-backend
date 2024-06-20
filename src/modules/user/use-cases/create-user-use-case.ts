import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { AppError } from '@/errors/app-error'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateUserDto } from '@user/dto/i-create-user-dto'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ birthDay, email, name, password, surName }: ICreateUserDto) {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(email)

    if (emailAlreadyRegistered)
      throw new AppError('Email already registered', 400)

    const passwordHash = await hash(password, 8)

    return await this.userRepository.create({
      birthDay,
      email,
      name,
      surName,
      password: passwordHash,
    })
  }
}
