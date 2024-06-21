import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteUserUseCase } from '@user/use-cases/delete-user-use-case'

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    const deletedUser = await deleteUserUseCase.execute(id)

    return response.status(200).json(deletedUser)
  }
}
