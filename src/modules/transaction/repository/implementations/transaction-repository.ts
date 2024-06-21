import { ITransactionRepository } from '@transaction/repository/i-transaction-repository'

import { PrismaClient, Transaction } from '@prisma/client'

import { ICreateTransactionDto } from '@transaction/dto/i-create-transaction-dto'
import { IUpdateTransactionDto } from '@transaction/dto/i-update-transaction-dto'

const prismaClient = new PrismaClient()

export class TransactionRepository implements ITransactionRepository {
  async create(props: ICreateTransactionDto): Promise<Transaction> {
    return await prismaClient.transaction.create({
      data: {
        ...props,
      },
    })
  }

  async update(props: IUpdateTransactionDto): Promise<Transaction> {
    const { id, ...rest } = props

    return await prismaClient.transaction.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
  }

  async delete(id: string): Promise<Transaction> {
    return await prismaClient.transaction.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Transaction | null> {
    return await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    })
  }
}
