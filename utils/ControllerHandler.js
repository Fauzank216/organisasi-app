import { errorResponse, successResponse } from "./Formatter.js"

const controllerHandler = async(res, params = [], fnModel) => {
    try{
        const result = await fnModel(params)
        return successResponse(res, 200, "Request completed successfully.", result)
    }catch(err){
        console.error(err)
        return errorResponse(res, 500, 'Internal Server Error')
    }    
}

export default controllerHandler