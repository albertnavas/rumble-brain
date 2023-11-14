const { getAdminGameUseCase } = require('../../../../application/admin/getAdminGame.useCase')
const { manageAdminGameUseCase } = require('../../../../application/admin/manageAdminGame.useCase')
const { getAdminGameResultsUseCase } = require('../../../../application/admin/getAdminGameResults.useCase')

const schema = require('../../contracts/adminGameManageController.contract.js')

const adminGameManageController =
  (io, socket, { parseParams, logger, repository }) =>
    async (params) => {
      const parseResponse = parseParams({ data: { ...socket.user, ...params }, schema })

      if (!parseResponse.validation) {
        logger.error('ERROR WS - adminGameManageController - Invalid params')
        return true
      }

      const { adminId, gameId, status } = parseResponse.data

      logger.info({ gameId, status }, '🔥 ADMIN - gameManage 🔥')

      const responseGetAdminGame = await getAdminGameUseCase({ logger, repository }, { adminId, gameId })

      if (!responseGetAdminGame.status) {
        logger.error({ error: responseGetAdminGame.error }, 'ERROR WS - responseGetAdminGame')
        return true
      }

      const { game } = responseGetAdminGame.data

      if (!game) {
        return io.of('/admin').to(`game-${game.gameId}`).emit('error', { message: 'Game not found' })
      }

      await manageAdminGameUseCase({ logger, repository }, { game, status })

      const responseGetAdminGameAfterManage = await getAdminGameUseCase(
        { logger, repository },
        { adminId, gameId, withCorrectAnswers: false },
      )

      if (!responseGetAdminGameAfterManage.status) {
        logger.error({ error: responseGetAdminGameAfterManage.error }, 'ERROR WS - responseGetAdminGameAfterManage')
        return true
      }

      const { game: updatedGame } = responseGetAdminGameAfterManage.data

      const responseGetAdminGameResults = await getAdminGameResultsUseCase({ logger, repository }, { gameId })

      if (!responseGetAdminGameResults.status) {
        logger.error({ error: responseGetAdminGameResults.error }, 'ERROR WS - responseGetAdminGameResults')
        return true
      }

      const { results } = responseGetAdminGameResults.data

      io.of('/admin').to(`game-${game.gameId}`).emit('game', updatedGame)

      if (results) {
        io.of('/admin').to(`game-${game.gameId}`).emit('results', results)
      }

      if (updatedGame.currentQuestion) {
        io.of('/player').to(`game-${game.gameId}`).emit('game', updatedGame)
      }
    }

module.exports = { adminGameManageController }
