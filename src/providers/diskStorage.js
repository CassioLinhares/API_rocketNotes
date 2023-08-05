const fs = require("fs"); //file management
const path = require("path");
const uploadConfig = require("../config/upload");

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOAD_FOLDER, file)
        );
        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

        try {
            await fs.promises.stat(filePath);//check if the file exists, status
        } catch {
            return;
        }
        await fs.promises.unlink(filePath);//delete
        return file;
    }
}

module.exports = DiskStorage;