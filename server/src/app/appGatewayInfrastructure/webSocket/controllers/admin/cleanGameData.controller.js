const { cleanGameDataUseCase } = require('../../../../application/admin/cleanGameData.useCase')
const { getAdminGameUseCase } = require('../../../../application/admin/getAdminGame.useCase')
const { getGamePlayersConnectedUseCase } = require('../../../../application/player/getGamePlayersConnected.useCase')

const schema = require('../../contracts/cleanGameDataController.contract')

const cleanGameDataController =
  (io, socket, { parseParams, logger, repository }) =>
    async (params) => {
      const parseResponse = parseParams({ data: { ...socket.user, ...params }, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - cleanGameDataController - Invalid params')
        return true
      }

      const { adminId, gameId } = parseResponse.data

      const responseGetAdminGame = await getAdminGameUseCase({ logger, repository }, { adminId, gameId, withCorrectAnswers: false })

      if (!responseGetAdminGame.status) {
        logger.error({ error: responseGetAdminGame.error }, 'ERROR WS - responseGetAdminGame')
        return true
      }

      const { game } = responseGetAdminGame.data

      if (game.gameStatus.status) {
        logger.info(`✅ ADMIN - GAME STARTED NO CLEAN GAME ${gameId} ✅`)
        return true
      }

      logger.info(`✅ ADMIN - CLEAN GAME ${gameId} ✅`)

      const sockets = io.of('/player').sockets
      const socketIdsConnected = Array.from(sockets).map(([socketId]) => socketId)

      await cleanGameDataUseCase(
        { logger, repository },
        {
          gameId,
          socketIdsConnected,
        },
      )

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
    }

module.exports = { cleanGameDataController }
