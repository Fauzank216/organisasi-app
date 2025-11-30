import { findUserByEmail, findUserById } from '../models/UserModels.js'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

export default function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    const user = await findUserByEmail([email])

                    if (!user) return done(null, false, { message: `User dengan email ${email}, tidak ditemukan.` })
                    const isMatch = await bcrypt.compare(password, user.password)

                    if (!isMatch) return done(null, false, { message: `Invalid password` })

                    return done(null, user)
                } catch (err) {
                    return done(err)
                }

            }
        ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById([id])
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
} 