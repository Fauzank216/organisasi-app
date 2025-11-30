import express from 'express'
import { register, login, logout } from './controllers/AuthControllers.js'
import session from 'express-session'
import passport from 'passport'
import userRouter from './routes/UserRoutes.js'
import maddingRouter from './routes/MaddingRoutes.js'
import activityRouter from './routes/ActivityRoutes.js'
import pageRouter from './routes/PageRoutes.js'
import attendanceRouter from './routes/AttendanceRoutes.js'
import Strategy from './config/Strategy.js'
import  dotenv  from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//setup ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
//auth middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/register', register)
app.get('/api/logout', logout)
app.post('/api/login', passport.authenticate('local'), login)

app.use('/api/users', userRouter)
app.use('/api/content', maddingRouter)
app.use('/api/activity', activityRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/page', pageRouter)


Strategy(passport)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})