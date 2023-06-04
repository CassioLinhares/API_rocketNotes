const sqlite3 = require("sqlite3"); // driver establishes a communication my database | database itself
const sqlite = require("sqlite"); // connection with database
const path = require("path"); //make your directories default for all SO.

//async = no exists = create db | yes exists = establishes a connection with db
async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;


/* 
*sqlite.open()  = establishes a connection.
*filename       = location where the file will saved.
*path.resolve() = resolve problem of directories between SO | defaulted S.O
* __dirname     = location current
*/