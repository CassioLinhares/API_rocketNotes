const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers"); //+1 would have to import the other tables

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join("");

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;





/*
* schemas[]   = tables, can exists +1
* createUsers = table create
* .join()     = join all tables
*.exec()      = execute all sql statements
 */