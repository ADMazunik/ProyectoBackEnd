import { Router } from "express";
import * as controllers from "../../controllers/user.controllers.js"
import passport from "passport";

const router = Router()

router.post("/login", passport.authenticate("login"), controllers.loginResponse)

router.post("/register", passport.authenticate('register'), controllers.registerResponse)

router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }))

router.get("/profile", passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile-github",
    passReqToCallback: true
}))

router.get("/logout", controllers.logout)

export default router;