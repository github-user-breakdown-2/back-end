const localPgConnection = {
  host: 'localhost',
  database: 'hobbits',
  user: 'student',
  password: 'password1'
}
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

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
    connection: prodDbConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }

};
