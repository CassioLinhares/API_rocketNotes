
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullable(); //does not allows nulls
});

exports.down = knex => knex.schema.dropTable("tags");

// running the MIGRATIONS it runs the UP method