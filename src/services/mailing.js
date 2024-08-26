import { createTransport } from "nodemailer"
import { config } from "../config/index.js"

const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD
    }
})

const MsgResetPassword = (first_name) => {
    return `<p>Hola, ${first_name}, has pedido generar una nueva contraseña. Sigue <a href="http://localhost:8080/new-pass">ESTE LINK</a> para continuar con el proceso.</p> `
}

export const sendMail = async (user) => {
    try {
        const { first_name, email } = user;
        const message = MsgResetPassword(first_name)

        const gmailOptions = {
            from: config.EMAIL,
            to: config.EMAIL,
            subject: "Cambio de Contraseña",
            html: message
        }

        const response = await transporter.sendMail(gmailOptions)
        if (response) return true
        console.log("Email Enviado 📩", response)
    } catch (error) {
        throw new Error(error)
    }
}