require("express-async-errors"); // import error handling library
const AppError = require("./utils/appError"); //import appError

const migrationsRun = require("./database/sqlite/migrations");
const express = require("express"); // import express
const routes = require("./routes") // by default it loads the file named index

const uploadConfig = require("./config/upload");
const cors = require("cors"); // backend to frontend integration

const app = express(); // init express

app.use(cors()); //server exec o cors
app.use(express.json()); //notify the type of data that comes in the request
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

migrationsRun(); // database

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