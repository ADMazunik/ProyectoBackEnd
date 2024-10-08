import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const checkPremium = async (req, res, next) => {

    try {
        const { role } = req.session.info;
        role == "premium" ? next() :
            role == "admin" ? next() : httpResponse.Unauthorized(res, undefined, `role must be Premium or higher`);
    } catch (error) {
        next(error);
    }
}