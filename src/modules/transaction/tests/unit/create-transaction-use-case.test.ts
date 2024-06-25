import { CreateTransactionUseCase } from '@transaction/use-cases/create-transaction-use-case'
import { InMemoryTransactionRepository } from '@transaction/repository/implementations/in-memory-transaction-repository'

let createTransactionUseCase: CreateTransactionUseCase

describe('create-transaction-use-case', () => {
  beforeEach(async () => {
    const transactionRepository = new InMemoryTransactionRepository()
    createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    )
  })

  it.todo(
    'should not be able to create a transaction inInstallment without installments',
  )
  it.todo('should be able to create a transaction inInstallment')
  it.todo('should be able to create a transaction fixed')
  it.todo('should be able to create a transaction detached')
})
