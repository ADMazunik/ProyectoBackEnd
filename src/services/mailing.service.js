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

const MsgResetPassword = (user) => {
    return `<p>Hola, ${user.first_name}, has pedido generar una nueva contraseña. Sigue <a href="http://localhost:8080/new-pass">ESTE LINK</a> para continuar con el proceso.</p> `
}
const MsgAccountDisabled = (user) => {
    return `<p>Hola, ${user.first_name}, Lamentamos informarte que tu cuenta se ha deshabilitado por inactividad, para volver a habilitarla ponte en contacto con Soporte.</p> `
}
const MsgPurchaseSuccessful = (user, data) => {
    return `
    <h1>Hola, ${user.first_name}!</h1>
    <p> Has generado satisfactoriamente una orden de compra con los siguientes datos: </p> 
    <p>Código: ${data.code}</p>
    <p>Fecha: ${data.purchase_datetime}</p>
    <p>Precio: $${data.amount}</p>  `
}


export const sendMail = async (user, service, data) => {
    try {

        let messageToSend = "";
        let subject = "";

        service == "resetPassword" ? (messageToSend = MsgResetPassword(user), subject = "Cambio de Contraseña")
            : service == "purchase" ? (messageToSend = MsgPurchaseSuccessful(user, data), subject = "Compra Completada")
                : service == "disableAccount" ? (messageToSend = MsgAccountDisabled(user), subject = "Cuenta Deshabilitada por Inactividad")
                    : (messageToSend = "", subject = "");



        const gmailOptions = {
            from: config.EMAIL,
            to: config.EMAIL,
            subject: subject,
            html: messageToSend
        }

        const response = await transporter.sendMail(gmailOptions)
        if (response) return true
        console.log("Email Enviado 📩", response)
    } catch (error) {
        throw new Error(error)
    }
}