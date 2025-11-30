import express from "express";
import { deleteUser, getUserHistory, searchUserByName, updateUser, getUserByIdController, getAllUserController, updateStatusUserController } from '../controllers/UserControllers.js'
import { isAuthenticated } from "../middlewares/authValidator.js";
const userRouter = express.Router()

userRouter.patch('/:userId', updateUser)
userRouter.delete('/:userId', deleteUser)
userRouter.get('/search', searchUserByName)
userRouter.get('/', isAuthenticated, getAllUserController)
userRouter.get('/history', isAuthenticated, getUserHistory)
userRouter.get('/:userId', getUserByIdController)
userRouter.get('/self', getUserByIdController)
userRouter.put('/:userId', updateStatusUserController)

export default userRouter