const path = require("path");
const multer = require("multer"); //lib
const crypto = require("crypto"); //nodejs

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tms");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "upload");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOAD_FOLDER,
    MULTER
}