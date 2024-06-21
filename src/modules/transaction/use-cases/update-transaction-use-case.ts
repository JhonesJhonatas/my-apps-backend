import { inject, injectable } from 'tsyringe'

import { AppError } from '@/errors/app-error'

import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'
import { IUpdateTransactionDto } from '@transaction/dto/i-update-transaction-dto'

@injectable()
export class UpdateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(props: IUpdateTransactionDto) {
    const transaction = await this.transactionRepository.findById(props.id)

    if (!transaction) throw new AppError('User not found', 404)

    return await this.transactionRepository.update(props)
  }
}
