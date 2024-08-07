const HttpStatus = {
    OK: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}

export class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            data,
        });
    }

    BadRequest(res, message = "Invalid Request", data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message,
            data,
        });
    }

    NotFound(res, message = "Not Found", data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message,
            data,
        });
    }

    Unauthorized(res, message = "Unauthorized Access", data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message,
            error: data,
        });
    }

    Forbidden(res, message = "Forbidden", data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message,
            error: data,
        });
    }

    ServerError(res, data) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: data,
        });
    }
}