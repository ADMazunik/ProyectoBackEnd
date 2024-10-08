import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import { logger } from "../utils/logger.js";


export const errorHandler = (error, req, res, next) => {
    console.log(error)
    logger.error(error.message);
    return httpResponse.ServerError(res, error.message)
}