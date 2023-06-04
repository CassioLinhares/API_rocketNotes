const { Router } = require("express"); //import Router of express
const usersRouter = Router();

const UserController = require("../controllers/UserController");
const userController = new UserController(); // instantiate class - reserve space in memory

usersRouter.post("/", userController.create);
usersRouter.put("/:id", userController.update);

module.exports = usersRouter;