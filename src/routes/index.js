const { Router } = require("express"); // import of express
const routes = Router(); // exe. express

const userRouter = require("./users.routes"); // import user.routes.js
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes");

routes.use("/users", userRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes; //export file