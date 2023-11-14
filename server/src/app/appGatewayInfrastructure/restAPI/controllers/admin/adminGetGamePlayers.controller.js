const { getGamePlayersConnectedUseCase } = require('../../../../application/player/getGamePlayersConnected.useCase')

const schema = require('../../contracts/adminGetGamePlayersController.contract')

const adminGetGamePlayersController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: req.params, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { gameId } = parseResponse.data

      if (!gameId) {
        return res.status(400).json({ status: false, message: 'No gameId provided' })
      }

      const responseGetGamePlayersConnected = await getGamePlayersConnectedUseCase({ logger, repository }, { gameId: gameId })

      if (!responseGetGamePlayersConnected.status) {
        return res.json([])
      }

      const { players } = responseGetGamePlayersConnected.data

      res.status(200).json(players)
    }

module.exports = { adminGetGamePlayersController }
