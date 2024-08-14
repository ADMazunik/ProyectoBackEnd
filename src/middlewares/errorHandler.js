import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import { logger } from "../utils/logger.js";


export const errorHandler = (error, req, res, next) => {
    logger.error(error.message);
    const status = error.status || 500
    return httpResponse.ServerError(res, error.message)
}