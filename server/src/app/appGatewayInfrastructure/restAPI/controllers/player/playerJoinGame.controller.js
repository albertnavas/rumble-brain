const { getPlayerGameUseCase } = require('../../../../application/player/getPlayerGame.useCase')
const { getPlayerUseCase } = require('../../../../application/player/getPlayer.useCase')
const { createPlayerUseCase } = require('../../../../application/player/createPlayer.useCase')

const schema = require('../../contracts/playerJoinGameController.contract')

const playerJoinGameController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: req.body, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { gameId, playerName } = parseResponse.data

      const responseGetPlayerGame = await getPlayerGameUseCase({ logger, repository }, { gameId })

      const { game } = responseGetPlayerGame.data

      if (!game) {
        logger.error(`❌ Game not found ${gameId}`)
        return res.status(404).json({ error: true, type: 'GAME_NOT_FOUND', message: 'Partida no encontrada' })
      }

      const responseGetPlayer = await getPlayerUseCase({ logger, repository }, { gameId, playerName })

      const { player } = responseGetPlayer.data

      if (player) {
        logger.info(`❌ PLAYER - ${playerName} already exists`)
        return res.status(400).json({ error: true, type: 'PLAYER_NAME_ALREADY_EXISTS', message: 'Este Nik ya existe' })
      }

      const responseCreatePlayer = await createPlayerUseCase({ logger, repository }, { gameId, playerName })

      if (!responseCreatePlayer.status) {
        return res.status(400).json({ error: true, type: 'PLAYER_CREATE_ERROR', message: 'No se pudo crear el jugador' })
      }

      const { playerConnectionToken } = responseCreatePlayer.data

      logger.info(`✅ PLAYER - ${playerName} added to ${gameId}!`)

      res.json({ gameId, playerName, playerConnectionToken })
    }

module.exports = { playerJoinGameController }
