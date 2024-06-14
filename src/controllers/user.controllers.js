import * as service from "../services/user.services.js"

export const login = async (req, res, next) => {
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
        console.log(error)
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
        console.log(error)
    }
}

export const logout = async (req, res, next) => {
    req.session.destroy();
    res.redirect("/login")
}