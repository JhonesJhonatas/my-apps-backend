import { inject, injectable } from 'tsyringe'

import { ICreateTransactionDto } from '@transaction/dto/i-create-transaction-dto'
import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(props: ICreateTransactionDto) {
    return await this.transactionRepository.create(props)
  }
}
