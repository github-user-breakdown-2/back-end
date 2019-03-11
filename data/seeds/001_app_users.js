exports.seed = function (knex, Promise) {
	return knex('appUsers')
		.truncate()
		.then(function () {
			return knex('appUsers').insert([
				{ email: 'admin@email.com', password: 'password' },
			]);
		});
};