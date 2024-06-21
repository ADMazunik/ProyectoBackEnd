import * as services from "../services/user.services.js"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

const strategyConfig = {
    usernameField: "email",
    passportField: "password",
    passReqToCallback: true
}

const login = async (req, email, password, done) => {
    try {
        const user = await services.login({ email, password })
        if (!user) {
            req.session.destroy()
            return done(null, false, { msg: "Invalid user or password" })
        }
        return done(null, user)
    } catch (error) {
        return done(error)
    }
}

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email)
        if (user) {
            return done(null, false)
        }
        else {
            const newUser = await services.register(req.body)
            return done(null, newUser)
        }
    } catch (error) {
        return done(error)
    }
}

const loginStrategy = new LocalStrategy(strategyConfig, login)
const signUpStrategy = new LocalStrategy(strategyConfig, signUp)

passport.use("register", signUpStrategy)
passport.use("login", loginStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id)
        return done(null, user)
    } catch (error) {
        done(error)
    }
}

)