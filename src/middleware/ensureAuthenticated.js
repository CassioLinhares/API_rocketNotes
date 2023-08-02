//middleware will intercept the request - token (id do user) = identify the user 
const {verify} = require("jsonwebtoken");
const authConfig = require("../config/auth");
const AppError = require("../utils/appError");

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization; //token inside authorization

    if (!authHeader) {
        throw new AppError("JWT token uninformed!", 401);
    }

    const [, token] = authHeader.split(" "); // "Bare token"

    try {
        const {sub: user_id} = verify(token, authConfig.jwt.secret);
        request.user = {
            id: Number(user_id) // parse number - bd
        }
        return next();
    } catch {
        throw new AppError("JWT token invalid!", 401);
    }
}

module.exports = ensureAuthenticated;