module.exports = {
  client: 'better-sqlite3',
  connection: {
    filename: `${__dirname}/test-end-to-end.sqlite3`,
    user: 'test',
    password: 'test',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/../../src/app/infrastructure/repository/sqlite/data/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  useNullAsDefault: true,
}
