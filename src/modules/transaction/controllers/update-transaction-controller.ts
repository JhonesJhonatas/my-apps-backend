import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateTransactionUseCase } from '@transaction/use-cases/update-transaction-use-case'

export class UpdateTransactionController {
  async handle(request: Request, response: Response) {
    const { body } = request

    const updateTransactionUseCase = container.resolve(UpdateTransactionUseCase)

    const transaction = await updateTransactionUseCase.execute(body)

    return response.status(200).json(transaction)
  }
}
