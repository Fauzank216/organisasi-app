import { createActivity, updateActivity, deleteActivity, getActivity, getActivityById, getActivityStats } from '../models/ActivityModels.js'
import controllerHandler from '../utils/ControllerHandler.js'
import { errorResponse } from '../utils/Formatter.js'

const createActivityController = async (req, res) => {
    let { activity, description, dateStart, dateEnd} = req.body
    let created_by = req.user.id
    if(!activity) return errorResponse(res, 400, "Activity is required")

    if(!description) return errorResponse(res, 400, "Description is required")
    
    controllerHandler(res, [activity, description, dateStart, dateEnd, created_by], createActivity)
}

const updateActivityController = async (req, res) => {
    let { activity, description, dateStart, dateEnd } = req.body
    let idActivity = req.params.idActivity

    if(!activity) return errorResponse(res, 400, "Activity is required")

    if(!description) return errorResponse(res, 400, "Description is required")

    if(Number.isNaN(idActivity)) return errorResponse(res, 400, "Id activity must be integer")  

    controllerHandler(res, [activity, description, dateStart, dateEnd, idActivity], updateActivity)
}

const deleteActivityController = async (req, res) => {
    let idActivity = req.params.idActivity

    if(Number.isNaN(idActivity)) return errorResponse(res, 400, "Id activity must be integer") 

    controllerHandler(res, [idActivity], deleteActivity)
}
const getActivityController = async (req, res) => {
    let memberId = req.user.id
     
    controllerHandler(res, [memberId], getActivity)
}

const getActivityByIdController = async (req, res) => {
    let idActivity = req.query.idActivity

    if(Number.isNaN(idActivity)) return errorResponse(res, 400, "Id activity must be integer") 

    controllerHandler(res, [idActivity], getActivityById)
}

const getActivityStatsController = async function(req, res) {
    controllerHandler(res,[] ,getActivityStats)
}

export { createActivityController, getActivityStatsController, updateActivityController, deleteActivityController, getActivityController, getActivityByIdController }