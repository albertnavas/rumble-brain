const { removeAdminGameUseCase } = require('../../../../application/admin/removeAdminGame.useCase')

const schema = require('../../contracts/adminRemoveGameController.contract')

const adminRemoveGameController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: { ...req.params, ...req.user }, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { gameId, adminId } = parseResponse.data

      if (!gameId) {
        return res.status(400).json({ status: false, message: 'No gameId provided' })
      }

      if (!adminId) {
        return res.status(400).json({ status: false, message: 'No adminId provided' })
      }

      const responseRemoveAdminGame = await removeAdminGameUseCase({ logger, repository }, { adminId, gameId })

      if (!responseRemoveAdminGame.status) {
        return res.status(500).json(false)
      }

      return res.status(200).json(true)
    }

module.exports = { adminRemoveGameController }
