import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteTransactionUseCase } from '@transaction/use-cases/delete-transaction-use-case'

export class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase)

    const deletedTransaction = await deleteTransactionUseCase.execute(id)

    return response.status(200).json(deletedTransaction)
  }
}
