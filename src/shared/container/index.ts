import { container } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'
import { UserRepository } from '@user/repository/implementations/user-repository'

import { ITransactionRepository } from '@/modules/transaction/repository/i-transaction-repository'
import { TransactionRepository } from '@/modules/transaction/repository/implementations/transaction-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
)
