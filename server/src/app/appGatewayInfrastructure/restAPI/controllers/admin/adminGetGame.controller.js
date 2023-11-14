const { getAdminGameUseCase } = require('../../../../application/admin/getAdminGame.useCase')

const schema = require('../../contracts/adminGetGameController.contract')

const adminGetGameController =
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

      const responseGetAdminGame = await getAdminGameUseCase({ logger, repository }, { adminId, gameId, withCorrectAnswers: true })

      if (!responseGetAdminGame.status) {
        return res.json(null)
      }

      const { game } = responseGetAdminGame.data

      res.status(200).json(game)
    }

module.exports = { adminGetGameController }
