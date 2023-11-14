const { getAdminGamesUseCase } = require('../../../../application/admin/getAdminGames.useCase')

const schema = require('../../contracts/adminGetGamesController.contract')

const adminGetGamesController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: req.user, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { adminId } = parseResponse.data

      const responseGetAdminGames = await getAdminGamesUseCase({ logger, repository }, { adminId })

      if (!responseGetAdminGames.status) {
        return res.status(200).json([])
      }

      const { games } = responseGetAdminGames.data

      res.status(200).json(games)
    }

module.exports = { adminGetGamesController }
