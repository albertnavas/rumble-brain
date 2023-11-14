require('./shared/infrastructure/loadEnvVars')

const { config } = require('./shared/infrastructure/config')

const { createLogger } = require('./shared/infrastructure/logger')
const logger = createLogger(config)

const { schemaValidation } = require('./shared/infrastructure/schemaValidation')
const { parseParams } = schemaValidation({ logger })

const { createHttpServer } = require('./serverHttp')
const { startWebSocketServer } = require('./serverWebSocket')

// Repository
const sqliteRepository = require('./app/infrastructure/repository/sqlite/sqliteRepository')
const repository = sqliteRepository(config.sqlite)

// Start HTTP & WebSocket servers
const bootstrap = () => {
  const { startHttpServer } = createHttpServer({ config, parseParams, logger, repository })
  const { httpServer } = startHttpServer()

  const io = startWebSocketServer(httpServer, { parseParams, logger, repository })

  process
    .on('unhandledRejection', (reason, p) => {
      logger.error('Unhandled Rejection at Promise')
      logger.error(reason)
      logger.error(p)
      shutDown(httpServer, io)
    })
    .on('uncaughtException', (err) => {
      logger.error('Uncaught Exception thrown')
      logger.error(err)
      shutDown(httpServer, io)
    })
}

const shutDown = (httpServer, io) => {
  httpServer.close(() => process.exit(1))
  io.close(() => process.exit(1))
  setTimeout(() => process.exit(1), 1000).unref()
  setTimeout(() => process.abort(), 2000).unref()
}

bootstrap()
