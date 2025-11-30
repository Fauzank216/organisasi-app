
import { isMember } from "../middlewares/authValidator.js"
import { getAttendanceHistory } from "../models/AttendanceModels.js"
import { getContentById, getContentHistory } from "../models/MaddingModels.js"
import { findAllUsers } from "../models/UserModels.js"

export const pageAdminController = async (req, res) => {
    const users = await findAllUsers()
    return res.render('admin', { page: 'dashboard', users: users })
}

export const pageMemberController = (req, res) => {
    return res.render('member', { page: 'home', isMember: req.isAuthenticated() })
}

export const pageDefaultController = (req, res) => {
    if (req.user.role == 'admin') return res.redirect('/page/admin')
    if (req.user.role == 'member') return res.redirect('/page/member')
    return res.redirect('/page/guest', { isMember: req.isAuthenticated() })
}

export const pageGuestController = (req, res) => {
    return res.render('member', { page: 'home', isMember: false })
}

export const getAttendanceHistoryController = async (req, res) => {
    let memberId = req.user.id
    let attendanceHistory = await getAttendanceHistory([memberId])
    return res.render('profile', { history: attendanceHistory })
}

export const pageProfileController = async (req, res) => {
    let user = req.user
    let attendanceHistory = await getAttendanceHistory([user.id])
    let maddingHistory = await getContentHistory([user.id])
    let history = [
        ...attendanceHistory.map(item => ({ ...item, type: 'absen' })),
        ...maddingHistory.map(item => ({ ...item, type: 'madding' }))]
    return res.render('member', { page: 'profile', user, history, isMember: req.isAuthenticated() })
}

export const pageAboutController = async (req, res) => {
    res.render('member', { page: 'about', isMember: req.isAuthenticated() })
}
export const pageHomeController = async (req, res) => {
    res.redirect('member')
}
export const pageLoginController = async (req, res) => {
    res.render('member', { page: 'login', isMember: req.isAuthenticated() })
}

export const pageInformationController = async (req, res) => {
    res.render('member', { page: 'information', isMember: true });
}

export const pageAttandanceController = async (req, res) => {
    res.render(`member`,{page:'attendanceForm', isMember:req.isAuthenticated()});
}

export const pageOrganigramController = async (req, res) => {
    res.render('member', { page: 'organigram', isMember: req.isAuthenticated() })
}

export const setValuEditController = async (req, res) => {
    let id = req.params.contentId
    const response = await getContentById([id])
    const data = response[0]
    console.log(`Dari set`, response)
    console.log(`Dari data`, data)
    res.render('memberPages/informationForm', { data, mode: 'update' })
}

export const createInformationController = async(req, res) =>{
    res.render('memberPages/informationForm', {data:"", mode:'add'} )
}

export const dashboardController = async (req, res) => {
    res.render('admin', { page: 'dashboard' })
}
export const approvalController = async (req, res) => {
    res.render('admin', { page: 'manageAttendance' })
}
export const managePostController = async (req, res) => {
    res.render('admin', { page: 'approval' })
}
export const manageAccountController = async (req, res) => {
    res.render('admin', { page: 'manageAccount' })
}
export const scheduleController = async (req, res) => {
    res.render('admin', { page: 'schedule' })
}
