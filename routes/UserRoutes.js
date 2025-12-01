import express from "express";
import { deleteUser, getUserHistory, searchUserByName, updateUser, getUserByIdController, getAllUserController, updateStatusUserController } from '../controllers/UserControllers.js'
import { isAuthenticated } from "../middlewares/authValidator.js";
import multer from 'multer'
import path from 'path'

const userRouter = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploads/avatar');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName)
  }
})

const upload = multer({storage:storage})

userRouter.patch('/:userId', upload.single('avatar'), updateUser)
userRouter.delete('/:userId', deleteUser)
userRouter.get('/search', searchUserByName)
userRouter.get('/', isAuthenticated, getAllUserController)
userRouter.get('/history', isAuthenticated, getUserHistory)
userRouter.get('/:userId', getUserByIdController)
userRouter.get('/self', getUserByIdController)
userRouter.put('/:userId', updateStatusUserController)

export default userRouter