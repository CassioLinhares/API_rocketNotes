const {Router} = require("express");
const tagsRouter = Router();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const TagsController = require("../controllers/tagsController");
const tagsController = new TagsController();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;