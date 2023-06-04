class AppError{
    message;
    statusCode;

    constructor(message, statusCode = 400){ //statusCode 400 = error of client = bad request
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;