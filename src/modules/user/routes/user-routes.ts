import { Router } from 'express'
import { CreateUserController } from '../controllers/create-user-controller'
import { UpdateUserController } from '../controllers/update-user-controller'
import { DeleteUserController } from '../controllers/delete-user-controller'

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

const authenticateUserController = new DeleteUserController()

export const userRoutes = Router()

userRoutes.post('/create', createUserController.handle)
userRoutes.put('/update', updateUserController.handle)
userRoutes.delete('/delete/:id', deleteUserController.handle)

userRoutes.post('/authenticate', authenticateUserController.handle)
