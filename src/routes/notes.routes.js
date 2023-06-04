const { Router } = require("express");
const notesRouter = Router();

const NotesController = require("../controllers/NotesController");
const notesController = new NotesController();

notesRouter.get("/", notesController.index); //when to use QUERY don't need to insert /something
notesRouter.post("/:user_id", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;