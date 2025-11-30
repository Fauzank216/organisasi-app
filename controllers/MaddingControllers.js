import { createContent, updateContent, updateApprovalStatus, deleteContent, getAllPublishedContent, getAllContents, getContentByCategory, getContentByDate, getContentByTitle, getContentHistory } from "../models/MaddingModels.js"
import controllerHandler from "../utils/ControllerHandler.js"
import { successResponse, errorResponse } from "../utils/Formatter.js"
const getAllContentController = async (req, res) => {
    if(req.isAuthenticated()) {
        let unPublishedContent = await getAllContents([req.user.id])
        let publishedContent = await getAllPublishedContent()
        let contents = [...unPublishedContent, ...publishedContent]
      
        return successResponse(res, 200, 'Request completed successfully.',contents )
    }
    return controllerHandler(res,[], getAllPublishedContent)
}

const createContentController = async (req, res) => {
   
    let memberId = req.user.id
   
    let {title, content, category} = req.body
    const filePath = `/img/uploads/${req.file.filename}`
    if(!memberId) return errorResponse(res, 400, "Id member is required")

    if (Number.isNaN(memberId)) return errorResponse(res, 400, "Member Id must be integer")

    if(!content) return errorResponse(res, 400, "Content is required")


    controllerHandler(res, [memberId, title, content, category, filePath], createContent)
}

const updateContentController = async (req, res) => {
    let idKContent = req.params.idContent 

    // if (Number.isNaN(memberId || kegiatanId)) return errorResponse(res, 400, "Member Id must be integer")

    let { title, content, category } = req.body
    controllerHandler(res, [title, content, category, idKContent], updateContent)
}

const updateApprovalStatusController = async (req, res) => {
    let idKonten = req.params.idContent

    // if (Number.isNaN(idKonten)) return errorResponse(res, 400, "Content Id must be integer")

    let { approved } = req.body
    controllerHandler(res, [approved, idKonten], updateApprovalStatus)
}

const deleteContentController = async (req, res) => {
    let idKonten = req.params.idContent

    // if (Number.isNaN(memberId || kegiatanId)) return errorResponse(res, 400, "Content Id must be integer")

    controllerHandler(res, [idKonten], deleteContent)
}

const getContentByTitleController = async (req, res) => {
    let title = req.query.title
    controllerHandler(res, [title], getContentByTitle)
}

const getContentByDateController = async (req, res) => {
    let date = req.query.date
    controllerHandler(res, [date], getContentByDate)
}

const getContentByCategoryController = async (req, res) => {
    let category = req.query.category
    controllerHandler(res, [category], getContentByCategory)
}

 const getContentHistoryController = async (req, res) => {
    let memberId = req.user.id
    controllerHandler(res, [memberId], getContentHistory)
}
export { getAllContentController, getContentHistoryController, createContentController, updateContentController, updateApprovalStatusController, deleteContentController, getContentByTitleController, getContentByDateController, getContentByCategoryController }