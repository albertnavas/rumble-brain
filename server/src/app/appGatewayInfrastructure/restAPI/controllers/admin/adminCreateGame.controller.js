const { createAdminGameUseCase } = require('../../../../application/admin/createAdminGame.useCase')

const schema = require('../../contracts/adminCreateGameController.contract')

const adminCreateGameController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: req.body, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { gameName } = parseResponse.data

      if (!gameName) {
        logger.error('❌ El nombre del juego es obligatorio')
        return res.status(400).json({
          error: true,
          type: 'ADMIN_CREATE_MISSING_GAME_NAME',
          message: 'El nombre del juego es obligatorio',
        })
      }

      const responseCreateAdminGame = await createAdminGameUseCase(
        { logger, repository },
        {
          adminId: req.user.adminId,
          gameName,
        },
      )

      if (!responseCreateAdminGame.status) {
        logger.error({ adminId: req.user.adminId, gameName }, 'Create game failed')
        res.status(403).json({ status: false, message: 'Create game failed' })
        return false
      }

      const { gameId } = responseCreateAdminGame.data

      res.status(200).json({ gameId })
    }

module.exports = { adminCreateGameController }
