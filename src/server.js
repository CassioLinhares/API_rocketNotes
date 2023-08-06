require("express-async-errors"); // import error handling library
const AppError = require("./utils/appError"); //import appError

const migrationsRun = require("./database/sqlite/migrations");
migrationsRun(); // database

const express = require("express"); // import express
const app = express(); // init express

const routes = require("./routes") // by default it loads the file named index
//const userRoutes = require("./routes/users.routes"); //import only that file

app.use(express.json()); //notify the type of data that comes in the request
app.use(routes);

const uploadConfig = require("./config/upload");
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

//error handling / middleware
app.use((error, request, response, next) => { //error of client
    if (error instanceof AppError) { // if the error comes from appError
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        }); 
    }

    console.error(error);

    return response.status(500).json({ //error of server
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //application start will display the port