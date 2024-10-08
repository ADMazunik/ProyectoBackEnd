import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const checkAdmin = async (req, res, next) => {

    try {
        const { role } = req.session.info;
        role == "admin" ? next() : httpResponse.Unauthorized(res, undefined, `role must be Premium or higher`);
    } catch (error) {
        next(error);
    }
}