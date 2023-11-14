const { disconnectedPlayerUseCase } = require('../../../../application/player/disconnectedPlayer.useCase')
const { getGamePlayersConnectedUseCase } = require('../../../../application/player/getGamePlayersConnected.useCase')

const schema = require('../../contracts/playerDisconnectingController.contract')

const playerDisconnectingController =
  (io, socket, { parseParams, logger, repository }) =>
    async (data) => {
      const parseResponse = parseParams({ data: { socketId: socket.id, reason: data }, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - playerDisconnectingController - Invalid params')
        return true
      }

      const { socketId, reason } = parseResponse.data

      const responseDisconnectedPlayer = await disconnectedPlayerUseCase({ logger, repository }, { socketId })

      if (!responseDisconnectedPlayer.status) {
        logger.warn(responseDisconnectedPlayer.error, 'WARN WS - responseDisconnectedPlayer')
        return true
      }

      const { game, player } = responseDisconnectedPlayer.data

      logger.info({ reason }, `❌ PLAYER - ${player.playerName} disconnected ❌`)

      socket.to(`game-${player.gameId}`).emit('player_left', player.playerName)

      const responseGetGamePlayersConnected = await getGamePlayersConnectedUseCase(
        { logger, repository },
        {
          gameId: game.gameId,
        },
      )

      if (!responseGetGamePlayersConnected.status) {
        logger.error({ error: responseGetGamePlayersConnected.error }, 'ERROR WS - responseGetGamePlayersConnected')
        return true
      }

      const { players } = responseGetGamePlayersConnected.data

      io.of('/admin').emit('players', players)
      io.of('/player').emit('players', players)

      io.of('/player').to(`game-${player.games_id}`).emit('game', game)
    }

module.exports = { playerDisconnectingController }
