import express from "express";
import { getAllContentController, createContentController, updateContentController, deleteContentController, getContentByTitleController, getContentByDateController, getContentByCategoryController, updateApprovalStatusController, getContentHistoryController } from '../controllers/MaddingControllers.js'
import { isMember } from '../middlewares/authValidator.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName)
  }
})

const upload = multer({ storage: storage })

const maddingRouter = express.Router()

maddingRouter.post('/', upload.single('thumbnail'),createContentController)
maddingRouter.put('/:idContent', updateContentController)
maddingRouter.patch('/:idContent', updateApprovalStatusController)
maddingRouter.delete('/:idContent', deleteContentController)
maddingRouter.get('/', getAllContentController)
maddingRouter.get('/filter/title', getContentByTitleController)
maddingRouter.get('/filter/date', getContentByDateController)
maddingRouter.get('/filter/category', getContentByCategoryController)
maddingRouter.get('/history', getContentHistoryController)
export default maddingRouter