import { Transaction } from '@prisma/client'

import { ICreateTransactionDto } from '@transaction/dto/i-create-transaction-dto'
import { IUpdateTransactionDto } from '@transaction/dto/i-update-transaction-dto'

export interface ITransactionRepository {
  create(props: ICreateTransactionDto): Promise<Transaction>
  update(props: IUpdateTransactionDto): Promise<Transaction>
  delete(id: string): Promise<Transaction>

  findById(id: string): Promise<Transaction | null>
}
