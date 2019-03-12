const localPgConnection = {
  host: 'localhost',
  database: 'appUsers',
  user: 'admin',
  password: 'password'
}
const prodDbConnection = process.env.HEROKU_POSTGRESQL_BRONZE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/db.sqlite3'
    },
    useNullAsDefault: true,
		migrations: { 
      directory: './data/migrations'
    },
		seeds: { 
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    // connection: prodDbConnection,
    connection: HEROKU_POSTGRESQL_BRONZE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }

};
