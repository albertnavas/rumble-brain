const { joinPlayerUseCase } = require('../../../../application/player/joinPlayer.useCase')
const { getGamePlayersConnectedUseCase } = require('../../../../application/player/getGamePlayersConnected.useCase')
const { getGamePlayerAnswersUseCase } = require('../../../../application/player/getGamePlayerAnswers.useCase')

const schema = require('../../contracts/joinPlayerController.contract')

const joinPlayerController =
  (io, socket, { parseParams, logger, repository }) =>
    async (clientData) => {
      const parseResponse = parseParams({ data: { socketId: socket.id, ...clientData }, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - joinPlayerController - Invalid params')
        return true
      }

      const { socketId, gameId, playerName, playerConnectionToken } = parseResponse.data

      const responseJoinPlayer = await joinPlayerUseCase(
        { logger, repository },
        {
          gameId,
          playerSocketId: socketId,
          playerName,
          playerConnectionToken,
        },
      )

      if (!responseJoinPlayer.status) {
        logger.error({ error: responseJoinPlayer.error }, 'ERROR WS - responseJoinPlayer')
        socket.emit('error', responseJoinPlayer.error)
        return true
      }

      const { game, player } = responseJoinPlayer.data

      logger.info(`🤝 PLAYER - ${playerName} joined to ${game.gameId} 🤝`)
      socket.join(`game-${game.gameId}`)

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

      const responseGetGamePlayerAnswers = await getGamePlayerAnswersUseCase(
        { logger, repository },
        {
          playerId: player.idPlayers,
          gameId: game.gameId,
        },
      )

      if (!responseGetGamePlayerAnswers.status) {
        logger.error({ error: responseGetGamePlayerAnswers.error }, 'ERROR WS - responseGetGamePlayerAnswers')
        return true
      }

      const { gamePlayerAnswers } = responseGetGamePlayerAnswers.data

      io.of('/player').to(socketId).emit('playerAnswers', gamePlayerAnswers)
      io.of('/player').to(socketId).emit('game', game)
    }

module.exports = { joinPlayerController }
