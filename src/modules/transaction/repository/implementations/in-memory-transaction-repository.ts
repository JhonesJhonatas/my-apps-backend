import { Transaction } from '@prisma/client'
import { ICreateTransactionDto } from '@transaction/dto/i-create-transaction-dto'
import { IUpdateTransactionDto } from '@transaction/dto/i-update-transaction-dto'
import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = []

  create(props: ICreateTransactionDto): Promise<Transaction> {
    const transaction = {
      ...props,
      installmentsId: props.installmentsId || null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.transactions.push(transaction)

    const createdTransaction = this.transactions.find(
      (createdTransaction) => createdTransaction.id === transaction.id,
    )

    return Promise.resolve(createdTransaction as Transaction)
  }

  createMany(props: ICreateTransactionDto[]): Promise<number> {
    const transactions = props.map((transaction) => ({
      ...transaction,
      id: randomUUID(),
      installmentsId: transaction.installmentsId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    this.transactions.push(...transactions)

    return Promise.resolve(transactions.length)
  }

  update(props: IUpdateTransactionDto): Promise<Transaction> {
    const { id, ...rest } = props

    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    )

    this.transactions[transactionIndex] = {
      ...this.transactions[transactionIndex],
      ...rest,
      updatedAt: new Date(),
    }

    const updatedTransaction = this.transactions.find(
      (transaction) => transaction.id === id,
    )

    return Promise.resolve(updatedTransaction as Transaction)
  }

  delete(id: string): Promise<Transaction> {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    )

    const [deletedTransaction] = this.transactions.splice(transactionIndex, 1)

    return Promise.resolve(deletedTransaction)
  }

  findById(id: string): Promise<Transaction | null> {
    const foundTransaction = this.transactions.find(
      (transaction) => transaction.id === id,
    )

    return Promise.resolve(foundTransaction || null)
  }

  findByInstallmentsId(id: string): Promise<Transaction[] | null> {
    const foundTransactions = this.transactions.filter(
      (transaction) => transaction.installmentsId === id,
    )

    return Promise.resolve(foundTransactions || null)
  }
}
