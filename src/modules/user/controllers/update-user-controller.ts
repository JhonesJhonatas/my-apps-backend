import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserUseCase } from '@user/use-cases/update-user-use-case'

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { body } = request

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const user = await updateUserUseCase.execute(body)

    return response.status(200).json(user)
  }
}
