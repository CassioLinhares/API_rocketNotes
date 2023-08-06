const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/appError");

class UserAvatarController {
    async update(request, response){
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;//new file = img

        const diskStorage = new DiskStorage();

        const user = await knex("users").where({id: user_id}).first();

        if (!user) {
            throw new AppError("Unauthenticated user", 401);
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        user.avatar = await diskStorage.saveFile(avatarFilename);
        await knex("users").update(user).where({id: user_id});

        return response.json(user);
    }
}

module.exports = UserAvatarController;