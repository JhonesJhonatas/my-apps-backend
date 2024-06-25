import { inject, injectable } from 'tsyringe'

import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'
import { AppError } from '@/errors/app-error'
import { randomUUID } from 'crypto'
import { addMonths } from 'date-fns'

type IRequest = {
  type: 'expense' | 'income'
  title: string
  amount: number
  maturity: Date
  paid: boolean
  userId: string
  expenseType: 'detached' | 'fixed' | 'inInstallment'
  installments?: number
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    amount,
    expenseType,
    maturity,
    paid,
    title,
    type,
    userId,
    installments,
  }: IRequest) {
    if (expenseType === 'inInstallment' && !installments) {
      throw new AppError(
        'Installments is required for inInstallment expense type',
        400,
      )
    }

    const installmentsId =
      expenseType === 'fixed' || expenseType === 'inInstallment'
        ? randomUUID()
        : null

    if (expenseType === 'inInstallment') {
      const transactions = Array.from({ length: installments || 0 }).map(
        (_, index) => {
          return {
            type,
            title,
            amount,
            maturity: addMonths(maturity, index),
            paid,
            userId,
            installmentsId: installmentsId || undefined,
            expenseType,
          }
        },
      )

      await this.transactionRepository.createMany(transactions)

      return await this.transactionRepository.findByInstallmentsId(
        installmentsId as string,
      )
    }

    return await this.transactionRepository.create({
      type,
      title,
      amount,
      maturity,
      paid,
      userId,
      expenseType,
    })
  }
}
