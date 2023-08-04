const { Router } = require("express");
const notesRouter = Router();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const NotesController = require("../controllers/NotesController");
const notesController = new NotesController();

notesRouter.use(ensureAuthenticated); //apply middleware to all notesRouter methods

notesRouter.get("/", notesController.index); //when to use QUERY don't need to insert /something
notesRouter.post("/", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;