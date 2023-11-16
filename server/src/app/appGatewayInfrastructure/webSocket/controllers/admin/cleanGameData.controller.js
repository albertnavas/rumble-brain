const { cleanGameDataUseCase } = require('../../../../application/admin/cleanGameData.useCase')
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

      const sockets = io.of('/player').sockets
      const socketIdsConnected = Array.from(sockets).map(([socketId]) => socketId)

      await cleanGameDataUseCase(
        { logger, repository },
        {
          gameId,
          adminId,
          socketIdsConnected,
        },
      )

      const responseGetGamePlayersConnected = await getGamePlayersConnectedUseCase(
        { logger, repository },
        {
          gameId,
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
