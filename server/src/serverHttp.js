const http = require('node:http')
const express = require('express')

const { createRouter } = require('./app/appGatewayInfrastructure/restAPI/restAPI.controllers')

const startHttpServerWithApp =
  (app, { logger }) =>
    () => {
      const httpServer = http.createServer(app)

      httpServer.listen(app.get('port'), () => {
        logger.info(`🚀 App running on http://localhost:${httpServer.address().port} 🚀`)
      })
      return { httpServer }
    }

const createHttpServer = ({ config, parseParams, logger, repository }) => {
  const app = express()

  const routes = createRouter(express, { config, parseParams, logger, repository })

  app.use('/', routes)

  app.set('port', config.port)

  return { app, startHttpServer: startHttpServerWithApp(app, { logger }) }
}

module.exports = { createHttpServer }
