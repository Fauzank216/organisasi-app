//Edit user, hapus user, searchingByUsername
import { getAttendanceHistory } from "../models/AttendanceModels.js"
import { getContentHistory } from "../models/MaddingModels.js"
import { deleteUserById, findAllUsers, findUserById, findUserByName, updateAvatarOnly, updateStatusUser, updateUserById } from "../models/UserModels.js"
import controllerHandler from "../utils/ControllerHandler.js"
import { errorResponse, successResponse } from "../utils/Formatter.js"



const updateUser = async (req, res) => {
    if (!req.isAuthenticated()) return errorResponse(res, 401, 'Please log in to continue.')

    let userId = req.params.userId

    if (Number.isNaN(userId)) return errorResponse(res, 400, "Id must be integer")

    const existingUser = await findUserById(userId)

    if (!existingUser) {
        return errorResponse(res, 404, `Couldn't find user with id ${userId}.`)
    }

    let { name, email, notelp } = req.body

    if (req.file && req.file.filename) {
        await updateAvatarOnly([req.file.filename, userId])
    }

    controllerHandler(res, [name, email, notelp, userId], updateUserById)
}

const deleteUser = async (req, res) => {
    if (!req.isAuthenticated() || req.user.role != 'admin') return errorResponse(res, 403, 'Access denied. You do not have permission to perform this action.')

    let id = req.params.userId

    const existingUser = await findUserById(id)

    if (!existingUser) {
        return errorResponse(res, 404, `Couldn't find user with id ${id}.`)
    }

    controllerHandler(res, [id], deleteUserById)
}

const searchUserByName = async (req, res) => {

    if (!req.isAuthenticated()) return errorResponse(res, 401, 'Please log in to continue.')

    let nama = req.query.nama

    const result = await findUserByName(nama)

    if (!result) return errorResponse(res, 404, `Couldn't find user with id ${nama}.`)
    controllerHandler(res, [nama], findUserById)
}

const getAllUserController = async (req, res) => {
    if (!req.isAuthenticated()) return errorResponse(res, 401, 'Please log in to continue.')
    let userId = req.user.id
    controllerHandler(res, [userId], findAllUsers)
}

const getUserHistory = async (req, res) => {
    let user = req.user
    let attendanceHistory = await getAttendanceHistory([user.id])
    let maddingHistory = await getContentHistory([user.id])
    let history = [
        ...attendanceHistory.map(item => ({ ...item, type: 'absen' })),
        ...maddingHistory.map(item => ({ ...item, type: 'madding' }))]
    console.log(user)
    return successResponse(res, 200, "Request completed successfully.", history)
}

const getUserByIdController = async (req, res) => {
    let userId = req.params.userId

    if (userId == 'self') {
        return successResponse(res, 200, 'Request completed successfully.', req.user)
    }

    controllerHandler(res, [userId], findUserById)
}


const updateStatusUserController = async (req, res) => {
    let { status } = req.body
    let userId = req.params.userId
    controllerHandler(res, [status, userId], updateStatusUser)
}
export { getAllUserController, updateUser, deleteUser, searchUserByName, getUserByIdController, getUserHistory, updateStatusUserController }