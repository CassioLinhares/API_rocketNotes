const knex = require("../database/knex");
const appError = require("../utils/appError");
const {compare} = require("bcryptjs");
const authConfig = require("../config/auth");
const {sign} = require("jsonwebtoken");

class SessionsController {
    async create(request, response){
        const {email, password} = request.body;

        const user = await knex("users").where({email}).first();

        if (!user) {
            throw new appError("Incorrect email and/our password", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new appError("Incorrect email and/our password", 401);
        }

        const {secret, expiresIn} = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        return response.json({user, token});
    }
}

module.exports = SessionsController;