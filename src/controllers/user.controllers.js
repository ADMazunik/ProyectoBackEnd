import * as service from "../services/user.services.js"
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

import { sendMail } from "../services/mailing.service.js";

export const registerResponse = (req, res, next) => {
    try {
        res.redirect("/login")
    } catch (error) {
        next(error)
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user
        const user = await service.getUserById(id)
        if (!user) httpResponse.NotFound(res, undefined, user)
        else {
            req.session.info = {
                user,
                loggedIn: true,
                username: user.email,
                role: user.role
            };
            res.redirect("/products")
        }
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        req.session.destroy();
        res.redirect("/login")
    } catch (error) {
        next(error)

    }
}

export const currentSession = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user
        const user = await service.getUserById(id)
        if (!user) httpResponse.Unauthorized(res, undefined, user)
        else {
            req.session.info = {
                user,
                loggedIn: true,
                username: user.email,
                role: user.role
            };
            res.json(req.session)
        }
    } catch (error) {
        next(error)
    }
}

export const profile = async (req, res, next) => {
    try {
        if (req.session.info.user) {
            const { _id } = req.session.info.user
            const profileUser = await service.getProfileUserByid(_id)
            return httpResponse.Ok(res, profileUser)
        } else {
            return httpResponse.Unauthorized(res, "Unauthorized", "Must be Logged In")
        }
    } catch (error) {
        next(error)
    }
}

export const getUsersMock = async (req, res, next) => {
    try {
        let { count } = req.query
        res.json(await service.createUsersMock(count))

    } catch (error) {
        next(error)
    }

}

export const generateResetPassword = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
        const user = await service.getUserById(id)
        if (!user) return httpResponse.NotFound(res, undefined, user)
        else {
            const mail = await sendMail(user, "resetPassword");
            if (mail == true) return httpResponse.Ok(res, undefined, user)
            else return httpResponse.NotFound(res, undefined, user)
        }

    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user
        const user = await service.getUserById(id)
        if (!user) httpResponse.NotFound(res, undefined, user)
        const { password } = req.body;

        const newPass = await service.updatePassword(password, user);
        if (!newPass) return httpResponse.NotFound(res, "Password cannot be the same", user);
        else logout()
    } catch (error) {
        next(error)
    }

}

export const checkUsersStatus = async (req, res, next) => {
    try {
        const checkUsers = await service.checkUsersStatus();
        if (!checkUsers) return httpResponse.BadRequest(res, undefined, "Couldn't verify users")
        return httpResponse.Ok(res, checkUsers)

    } catch (error) {
        next(error)
    }
}