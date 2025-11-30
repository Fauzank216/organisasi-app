import { createUser, findUserByEmail } from "../models/UserModels.js"
import { validateEmail, validatePassword } from "../utils/Validate.js"
import { successResponse, errorResponse } from "../utils/Formatter.js"
import bcrypt from "bcrypt"


const register = async (req, res) => {
    let { nama, email, password } = req.body

    if (!validateEmail(email) || !validatePassword(password)) {
        return errorResponse(res, 400, 'Invalid Request Data')
    }

    const existingUser = await findUserByEmail([email])

    if (existingUser) {
        return errorResponse(res, 409, 'Data already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await createUser([nama, email, hashedPassword])
    return successResponse(res, 200, 'Login successfully', { url: '/page/member' })

}

const login = async (req, res) => {
    console.log("Login controller mulai...")
    console.log("Req user", req.user)
    if (!req.user) {
        return errorResponse(res, 401, 'Authentication failed.')
    }

    if (req.user.role == 'admin') {
        return successResponse(res, 200, 'Login successfully', { url: '/page/admin' })
    }

    return successResponse(res, 200, 'Login successfully', { url: '/page/member' })
}

const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/page/guest')
        })
    })
}


export { register, login, logout }