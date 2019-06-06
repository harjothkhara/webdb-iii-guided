
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {name: 'Web Student'},
        {name: 'Web TA'}
      ]);
    });
};

//npx knex seed:make name
//npx knex seed:run --->to run them