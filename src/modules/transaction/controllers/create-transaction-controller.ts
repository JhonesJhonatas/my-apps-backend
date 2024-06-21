import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateTransactionUseCase } from '@transaction/use-cases/create-transaction-use-case'

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { body } = request

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

    const user = await createTransactionUseCase.execute(body)

    return response.status(201).json(user)
  }
}
