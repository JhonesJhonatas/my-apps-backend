import { Router } from 'express'

import { CreateTransactionController } from '../controllers/create-transaction-controller'
import { UpdateTransactionController } from '../controllers/update-transaction-controller'
import { DeleteTransactionController } from '../controllers/delete-transaction-controller'

const createTransactionController = new CreateTransactionController()
const updateTransactionController = new UpdateTransactionController()
const deleteTransactionController = new DeleteTransactionController()

export const transactionRoutes = Router()

transactionRoutes.post('/create', createTransactionController.handle)
transactionRoutes.post('/update', updateTransactionController.handle)
transactionRoutes.post('/delete/:id', deleteTransactionController.handle)
