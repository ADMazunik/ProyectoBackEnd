import * as service from "../services/user.services.js"
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()


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
        if (!user) httpResponse.NotFound(res, user)
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
        if (!user) httpResponse.Unauthorized(res, user)
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

export const getUsersMock = async (req, res, next) => {
    try {
        let { count } = req.query
        res.json(await service.createUsersMock(count))

    } catch (error) {
        next(error)
    }

}

/* export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const response = await service.login(email, password)
        if (!response) return res.status(401).json({ msg: "Usuario o Contraseña incorrectos" })
        else {
            req.session.info = {
                loggedIn: true,
                username: email,
                role: response.role
            };
            res.status(201).redirect("/products")
        }
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const newUser = await service.register({
                ...req.body,
                role: "admin"
            })
            if (!newUser) return res.status(401).json({ msg: "User already exists" })
            else return res.redirect("/login")
        } else {
            const newUser = await service.register(req.body)
            if (!newUser) return res.status(401).json({ msg: "User already exists" })
            else return res.redirect("/login")
        }
    } catch (error) {
        next(error);
    }
} */