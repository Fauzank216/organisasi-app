import { authorizeRole, isAuthenticated, isMember } from '../middlewares/authValidator.js'
import { pageAdminController, pageDefaultController, pageHomeController, pageAboutController, pageGuestController, pageMemberController, pageProfileController, pageLoginController, pageOrganigramController, pageInformationController, setValuEditController, pageAttandanceController, dashboardController, approvalController, manageAccountController, createInformationController, scheduleController, managePostController } from '../controllers/PageControllers.js'
import express from 'express'

const pageRouter = express.Router()

//NON ADMIN ROUTER
pageRouter.get('/', isAuthenticated, pageDefaultController)
pageRouter.get('/guest', pageGuestController)
pageRouter.get('/member', isAuthenticated, authorizeRole('member'), pageMemberController)
pageRouter.get('/profile', isAuthenticated, pageProfileController)
pageRouter.get('/about', pageAboutController)
pageRouter.get('/home', pageHomeController)
pageRouter.get('/login', pageLoginController)
pageRouter.get('/organigram', pageOrganigramController)
pageRouter.get('/information', isMember, pageInformationController)
pageRouter.get('/attandance', pageAttandanceController)
pageRouter.get('/information/create', createInformationController)
pageRouter.get('/update/:contentId', setValuEditController)

// ADMIN ROUTER
pageRouter.get('/admin', isAuthenticated, authorizeRole('admin'), pageAdminController)
pageRouter.get('/dashboard', isAuthenticated, dashboardController)
pageRouter.get('/attendance', approvalController)
pageRouter.get('/manageAccount', isAuthenticated, manageAccountController)
pageRouter.get('/managePost', isAuthenticated, managePostController)
pageRouter.get('/schedule', isAuthenticated, scheduleController)

// pageRouter.get('/profile/madding', isAuthenticated, getContentHistoryController)
// pageRouter.get('/profile/attendance', isAuthenticated, getAttendanceHistoryController )
export default pageRouter