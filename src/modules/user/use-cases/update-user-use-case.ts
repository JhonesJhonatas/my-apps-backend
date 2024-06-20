import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { AppError } from '@/errors/app-error'

import { IUserRepository } from '@user/repository/i-user-repository'
import { IUpdateUserDto } from '@user/dto/i-update-user-dto'

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    id,
    birthDay,
    email,
    name,
    password,
    surName,
  }: IUpdateUserDto) {
    const user = await this.userRepository.findById(id)

    if (!user) throw new AppError('User not found', 404)

    const emailAlreadyRegistered = email
      ? await this.userRepository.findByEmail(email)
      : undefined

    if (emailAlreadyRegistered && emailAlreadyRegistered.id !== id)
      throw new AppError('Email already registered', 400)

    const passwordHash = password ? await hash(password, 8) : undefined

    return await this.userRepository.update({
      id,
      birthDay,
      email,
      name,
      password: passwordHash,
      surName,
    })
  }
}
