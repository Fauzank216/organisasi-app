import express from 'express'
import { createAttendanceController, deleteAttendanceController, getAttendanceByNameController, getAttendanceByVerifiedController, getAttendanceController, getAttendanceHistoryController, getAttendanceStastController, updateVerifyController } from '../controllers/AttendanceControllers.js'
const attendanceRouter = express.Router()

attendanceRouter.post('/', createAttendanceController)
attendanceRouter.patch('/:attendanceId', updateVerifyController)
attendanceRouter.delete('/:attendanceId', deleteAttendanceController)
attendanceRouter.get('/', getAttendanceController)
attendanceRouter.get('/nama', getAttendanceByNameController)
attendanceRouter.get('/verified', getAttendanceByVerifiedController)
attendanceRouter.get('/history', getAttendanceHistoryController)
attendanceRouter.get('/stats', getAttendanceStastController)
export default attendanceRouter