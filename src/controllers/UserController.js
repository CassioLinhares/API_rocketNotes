const { hash, compare } = require("bcryptjs"); // import function hash and compare
const AppError = require("../utils/appError"); // import appError.js
const SqliteConnection = require("../database/sqlite");

class UserController{
    async create(request, response){
        // response.send(`You called POST`)
        const {name, email, password} = request.body;

        const database =  await SqliteConnection();
        const checkUserExists = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (checkUserExists) {
            throw new AppError("E-mail is in use!")    
        }

        const hashedPassword = await hash(password, 8); //cryptography

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
        );

        return response.status(201).json();
        /* throw error 
        if (!name) {
            throw new AppError("Name is mandatory!"); 
        }
        response.status(201).json({name, email, password})
        */
    }

    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const {id} = request.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if(!user){
            throw new AppError("User does not exist");
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("E-mail is in use!");
        }

        user.name = name ?? user.name; // nullish operator
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError("You need to inform the old password for to able update the password!")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError("Your old password does not match!");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?
        `, 
            [user.name, user.email, user.password, id]
        );

        return response.json();
    }
}

module.exports = UserController;


/*
* index  - GET    for list multiple records.
* show   - GET    for display a specific record
* create - POST   for create a record.
* update - PUT    for update a record.
* delete - DELETE for remove a record.

* .run() = running the code inside in database | run only 1 statement SQL

*npm install bcryptjs = cryptography 
- hash is function | compare - is function compare 2 values (password - old_password)

* NULLISH OPERATOR = ?? | if operator of left = null or undefined - return operator of right
*/