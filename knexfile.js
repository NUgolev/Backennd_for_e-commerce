import path from 'path';
import knex from "knex";

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://Admin:Admin@localhost:5432/test_db',
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://Admin:Admin@localhost:5432/test_db',
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    }
  }
};

export default knexConfig