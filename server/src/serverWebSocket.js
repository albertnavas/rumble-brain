const { Server } = require('socket.io')

const { webSocketControllers } = require('./app/appGatewayInfrastructure/webSocket/webSocket.controllers')

const { authWebSocketMiddleware } = require('./app/appGatewayInfrastructure/webSocket/middlewares/authWebSocket.middleware')

const startWebSocketServer = (httpServer, { parseParams, logger, repository }) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
    connectionStateRecovery: {
      maxDisconnectionDuration: 30 * 60 * 1000, // 30 minutes
      skipMiddlewares: false,
    },
  })

  const { adminWebSocketControllers, playerWebSocketControllers } = webSocketControllers(io, {
    parseParams,
    logger,
    repository,
  })

  // Admin Namespace
  const adminNsp = io.of('/admin')
  adminNsp.use(authWebSocketMiddleware({ parseParams, logger, repository }))
  adminNsp.on('connection', (socket) => {
    if (socket.recovered) {
      logger.info(`✅ ADMIN - ${socket.id} recovered ✅`)
    } else {
      logger.info(`✅ ADMIN - ${socket.id} connected ✅`)
    }
    adminWebSocketControllers(socket)
  })

  // Player Namespace
  const playerNsp = io.of('/player')
  playerNsp.on('connection', (socket) => {
    if (socket.recovered) {
      logger.info(`✅ PLAYER - ${socket.id} recovered ✅`)
    } else {
      logger.info(`✅ PLAYER - ${socket.id} connected ✅`)
    }
    playerWebSocketControllers(socket)
  })

  return io
}

module.exports = { startWebSocketServer }
