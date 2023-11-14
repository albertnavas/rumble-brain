const { playerDisconnectingController } = require('./player/playerDisconnecting.controller')
const { playerAnswerController } = require('./player/playerAnswer.controller')
const { joinPlayerController } = require('./player/joinPlayer.controller')

const playerWebSocketControllers =
  (io, { parseParams, logger, repository }) =>
    (socket) => {
      socket.on('joinPlayer', joinPlayerController(io, socket, { parseParams, logger, repository }))
      socket.on('playerAnswer', playerAnswerController(io, socket, { parseParams, logger, repository }))
      socket.on('disconnecting', playerDisconnectingController(io, socket, { parseParams, logger, repository }))
    }

module.exports = { playerWebSocketControllers }
