const knex = require("../database/knex");

class NotesController{
    async create(request, response){
        const {title, description, links, tags} = request.body;
        const {user_id} = request.params;

        //when inserting data it returns the [note_id] - needs to be equals the what have in the bd.
        const [note_id] = await knex("notes").insert({ 
            title, 
            description, 
            user_id 
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link //change link to url
            }
        });

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return{
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);
        response.json();
    }

    async show(request, response){ 
        // lists the content present inside each note through the id
        const {id} = request.params;

        const note = await knex("notes").where({ id }).first(); 
        const links = await knex("links").where({ note_id : id }).orderBy("created_at");
        const tags = await knex("tags").where({ note_id : id }).orderBy("name");

        response.json({
            ...note, links, tags
        })
    }

    async delete(request, response){
        const {id} = request.params;

        await knex("notes").where({ id }).delete();

        response.json();
    }

    async index(request, response){
        const {user_id, title, tags} = request.query;
        let notes;

        if (tags) {
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("tags")
            .select(["notes.id", "notes.title", "notes.user_id"])
            .where("notes.user_id", user_id)
            .whereLike("title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy("notes.title") 

        } else{
            notes = await knex("notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title");
        }

        const userTags = await knex("tags").where({user_id});

        const noteWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);
            return {
                ...note,
                tag: noteTags
            }
        });

        response.json(noteWithTags);
    }
}

module.exports = NotesController;