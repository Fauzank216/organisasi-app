import { response } from "./Formatter.js"

const notFounderrorHandler =  (res, message = "404 Not Found") => {
    response(res, false, 404, message)
}

const UnauthorizedErrorHandler = (res, message = "401 Unauthorized") => {
    response(res, false, 401, message)
}

const badRequestErrorHandler = (res, message = "400 Bad Request") => {
    response(res, false, 400, message)
}

const internalServerErrorHandler = (res, message = "500 Internal Server Error") => {
  response(res, false, 500, message)
}

export {notFounderrorHandler, UnauthorizedErrorHandler, badRequestErrorHandler, internalServerErrorHandler}