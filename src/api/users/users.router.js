import { Router } from "express";
import * as controllers from "../../controllers/user.controllers.js";
import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { checkAdmin } from "../../middlewares/checkAdmin.js";

const router = Router();

router.post("/login", passport.authenticate("login"), controllers.loginResponse);

router.post("/register", passport.authenticate('register'), controllers.registerResponse);

router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/profile", [checkAuth], controllers.profile);

router.get("/logout", controllers.logout);
router.get("/current", controllers.currentSession);

router.get("/mockingusers", controllers.getUsersMock);

router.get("/new-pass", controllers.generateResetPassword);

router.get("/checkInactivity", [checkAuth, checkAdmin], controllers.checkUsersStatus)

export default router;