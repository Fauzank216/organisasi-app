const successResponse = (res, statusCode = 200, message, data = null ) =>{
    return  res.status(statusCode).json({
        success : true,
        message,
        data,
    })
}

 const errorResponse = (res, statusCode = 200, message, data = null ) =>{
    return res.status(statusCode).json({
        success : false,
        message,
        data,
    })
}

export {successResponse, errorResponse}