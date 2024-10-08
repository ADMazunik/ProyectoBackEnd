import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse()

export const checkAuth = async (req, res, next) => {

    try {
        const { session } = req;
        if (!session.info) return httpResponse.Unauthorized(res, undefined, "You must be Logged In");
        next()
    } catch (error) {
        next(error)
    }

}