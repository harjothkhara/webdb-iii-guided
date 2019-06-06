
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      tbl.increments();

      tbl
        .string('name', 255)
        .notNullable();

        // add a foreign key - looking at a primary key on another table
        tbl
            .integer('roles_id') //foreign key is an integer that you create, give it a name
            .unsigned() //always unsigned
            .references('id') //reference the id field, primary key on the primary table //column
            .inTable('roles') //in the table roles //table
            .OnDelete('CASCADE')
            .OnUpdate('CASCADE')

      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
