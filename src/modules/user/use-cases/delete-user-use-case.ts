import { inject, injectable } from 'tsyringe'

import { AppError } from '@/errors/app-error'

import { IUserRepository } from '@user/repository/i-user-repository'

@injectable()
export class DeleteUserUsecase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    const userToDelete = await this.userRepository.findById(id)

    if (!userToDelete) throw new AppError('User not found', 404)

    return await this.userRepository.delete(id)
  }
}
