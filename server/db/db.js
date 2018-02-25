// Mostly copied from an example here: https://github.com/brianc/node-postgres

const pgp = require('pg-promise')({})

const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const db = pgp(config)

module.exports = db
