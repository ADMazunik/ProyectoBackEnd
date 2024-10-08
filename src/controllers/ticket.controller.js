import * as service from "../services/ticket.service.js"
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse()

export const generateTicket = async (req, res, next) => {
    try {
        const { user } = req.session.info;
        const ticket = await service.generateTicket(user);
        if (!ticket) httpResponse.NotFound(res, "Not found", "Error generating Ticket")
        else httpResponse.Ok(res, ticket);
    } catch (error) {
        next(error)
    }
}