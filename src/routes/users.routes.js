const { Router } = require("express"); //import Router of express
const multer = require("multer");
const uploadConfig = require("../config/upload");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);//informing the settings de upload

const userController = new UserController(); // instantiate class - reserve space in memory
                                                                                                                                                                                                                                                                                                                                                                                                                                                                
usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename);
    return response.json();
});

module.exports = usersRouter;