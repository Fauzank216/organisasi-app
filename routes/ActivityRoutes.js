import express from 'express'
import { createActivityController, deleteActivityController, getActivityByIdController, getActivityController, getActivityStatsController, updateActivityController } from '../controllers/ActivityControllers.js'
import { isAuthenticated } from '../middlewares/authValidator.js'
const activityRouter = express.Router()

activityRouter.post('/', createActivityController)
activityRouter.get('/', isAuthenticated, getActivityController)
activityRouter.get('/stats', isAuthenticated, getActivityStatsController)
activityRouter.put('/:idActivity', updateActivityController)
activityRouter.delete('/:idActivity', deleteActivityController)
activityRouter.get('/:idActiviy', getActivityByIdController)

export default activityRouter