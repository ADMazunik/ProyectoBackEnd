import * as service from "../services/user.services.js"

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
        if (!user) res.status(401).json({ msg: "Usuario o Contraseña inválidos" })
        else {
            const { first_name, last_name, email, age, role } = user
            req.session.info = {
                loggedIn: true,
                username: email,
                role: role
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
        console.log(error)

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
} */