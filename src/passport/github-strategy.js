import * as services from "../services/user.services.js";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import "dotenv/config";

const ENV = process.argv[2] || "prod"

const callBackURL = ENV == "dev" ? "http://localhost:3000/products" : "https://proyecto-back-end-phi.vercel.app/products";

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: callBackURL
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const { login } = profile._json
        const email = `${login}@github.com`
        const user = await services.getUserByEmail(email)
        if (user) return done(null, user)
        else {
            const newUser = await services.register({
                first_name: login,
                last_name: login,
                email,
                password: " "
            })
            return done(null, newUser)
        }

    } catch (error) {
        return done(error)
    }
}

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin))

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