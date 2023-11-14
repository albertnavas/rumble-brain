module.exports = (sqliteConfig) => ({
  client: 'better-sqlite3',
  connection: {
    filename: process.env.END_TO_END
      ? `${__dirname}/../../../../../tests/end-to-end/test-end-to-end.sqlite3`
      : `${__dirname}/data/db.sqlite3`,
    user: sqliteConfig?.user || 'test',
    password: sqliteConfig?.password || 'test',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './data/migrations',
  },
  useNullAsDefault: true,
})
