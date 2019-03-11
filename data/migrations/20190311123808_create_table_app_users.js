exports.up = function(knex, Promise) {
	return knex.schema.createTable('appUsers', function(tbl) {
        tbl.increments();
        tbl.string('email', 255).unique().notNullable();
        tbl.string('password').notNullable();
	});
};
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('appUsers');
};