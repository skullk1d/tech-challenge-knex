// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}
