import { inject, injectable } from 'tsyringe'

import { AppError } from '@/errors/app-error'

import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'

@injectable()
export class DeleteTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string) {
    const transactionToDelete = await this.transactionRepository.findById(id)

    if (!transactionToDelete) throw new AppError('Transaction not found', 404)

    return await this.transactionRepository.delete(id)
  }
}
