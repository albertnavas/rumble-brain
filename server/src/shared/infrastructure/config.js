const config = {
  environment: process.env.ENVIRONMENT,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  originURL: process.env.ORIGIN_URL,
  sqlite: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
}

module.exports = { config }
