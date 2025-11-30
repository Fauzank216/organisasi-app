import { createAttendance, deleteAttendance, getAttendance, getAttendanceByName, getAttendanceByVerified, getAttendanceHistory, getAttendanceStats, updateVerifyAttendance } from "../models/AttendanceModels.js";
import controllerHandler from "../utils/ControllerHandler.js";
import { errorResponse } from "../utils/Formatter.js";

const createAttendanceController = async (req, res) => {
    let {activity, date, status } = req.body
    console.log(`Dari absen controllers`,req.body)

    let memberId = req.user.id

    if (!activity) return errorResponse(res, 400, "Id activity is required")

    if (Number.isNaN(memberId || activity)) return errorResponse(res, 400, "Id activity and member Id must be integer")

    controllerHandler(res, [memberId, activity, date, status], createAttendance)
}

const updateVerifyController = async (req, res) => {
    let attendanceId = req.params.attendanceId

    if (Number.isNaN(attendanceId)) return errorResponse(res, 400, "Attendance id must be integer")

    controllerHandler(res, [attendanceId], updateVerifyAttendance)
}

const deleteAttendanceController = async (req, res) => {
    let attendanceId = req.params.attendanceId

    if (Number.isNaN(attendanceId)) return errorResponse(res, 400, "Attendance id must be integer")

    controllerHandler(res, [attendanceId], deleteAttendance)
}

const getAttendanceController = async (req, res) => {
    controllerHandler(res, [], getAttendance)
}

const getAttendanceByNameController = async (req, res) => {
    let name = req.query.nama
    console.log(name)
    controllerHandler(res, [name], getAttendanceByName)
}

const getAttendanceStastController = async (req, res) => {
    controllerHandler(res, [], getAttendanceStats)
}

const getAttendanceByVerifiedController = async (req, res) => {
    let verified = req.query.verify
    controllerHandler(res, [verified], getAttendanceByVerified)
}


const getAttendanceHistoryController = async (req, res) => {
    let memberId = req.user.id
    controllerHandler(res, [memberId], getAttendanceHistory)
}
export { createAttendanceController, updateVerifyController, deleteAttendanceController, getAttendanceByNameController, getAttendanceByVerifiedController, getAttendanceController, getAttendanceHistoryController, getAttendanceStastController }