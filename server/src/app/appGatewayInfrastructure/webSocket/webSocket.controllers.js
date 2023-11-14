const { playerWebSocketControllers } = require('./controllers/playerWebSocket.controllers')
const { adminWebSocketControllers } = require('./controllers/adminWebSocket.controllers')

const webSocketControllers = (io, { parseParams, logger, repository }) => ({
  playerWebSocketControllers: playerWebSocketControllers(io, { parseParams, logger, repository }),
  adminWebSocketControllers: adminWebSocketControllers(io, { parseParams, logger, repository }),
})

module.exports = { webSocketControllers }
