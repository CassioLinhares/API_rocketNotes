const knex = require("../database/knex");

class NotesController{
    async create(request, response){
        const {title, description, links, tags} = request.body;
        const user_id = request.user.id;

        //when inserting data it returns the ID of note = [note_id] - needs to be equals the what have in the bd.
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
        return response.json();
    }

    async show(request, response){
        const {id} = request.params;
        // lists the content present inside each note through the id

        const note = await knex("notes").where({id}).first();
        const tags = await knex('tags').where({note_id:id}).orderBy('name');
        const links = await knex('links').where({note_id: id}).orderBy("created_at");
        
        return response.json({
         ...note,
         tags,
         links
        });
      }

    async delete(request, response){
        const {id} = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, tags } = request.query;
        const user_id = request.user.id;
        let notes;
    
        if (tags) {
            const filterTags = tags.split(",").map(tag => tag.trim());
    
            notes = await knex("tags")
                .select([
                    "notes.id", 
                    "notes.title", 
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .where("notes.title", "LIKE", `%${title}%`)
                .whereIn("tags.name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .groupBy("notes.id");
        } else {
            notes = await knex("notes")
                .where({ user_id })
                .where("title", "LIKE", `%${title}%`)
                .orderBy("title");
        }
    
        const userTags = await knex("tags").where({ user_id });
    
        const noteWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);
            return {
                ...note,
                tags: noteTags
            };
        });
    
        return response.json(noteWithTags);
    }
    
}

module.exports = NotesController;