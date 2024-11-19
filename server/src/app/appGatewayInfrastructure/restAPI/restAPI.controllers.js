const cors = require('cors')

const { authRestAPIMiddleware } = require('./../../../app/appGatewayInfrastructure/restAPI/middlewares/authRestAPI.middleware')

const { playerJoinGameController } = require('./controllers/player/playerJoinGame.controller')
const { adminCreateGameController } = require('./controllers/admin/adminCreateGame.controller')
const { adminRemoveGameController } = require('./controllers/admin/adminRemoveGameController')
const { adminGetGamesController } = require('./controllers/admin/adminGetGames.controller')
const { adminGetGameController } = require('./controllers/admin/adminGetGame.controller')
const { adminGetGamePlayersController } = require('./controllers/admin/adminGetGamePlayers.controller')
const { adminSaveGameQuestionsController } = require('./controllers/admin/adminSaveGameQuestions.controller')
const { adminSignInController } = require('./controllers/admin/adminSignIn.controller')

const createRouter = (express, { config, parseParams, logger, repository }) => {
  const routes = express.Router()

  routes.use(express.json())
  routes.use(cors({ origin: config.originURL }))

  routes.use(authRestAPIMiddleware({ parseParams, logger, repository }))

  // Admin
  routes.post('/admin/signin', adminSignInController({ parseParams, logger, repository }))
  routes.post('/game/create', adminCreateGameController({ parseParams, logger, repository }))
  routes.get('/games', adminGetGamesController({ parseParams, logger, repository }))
  routes.get('/games/:gameId', adminGetGameController({ parseParams, logger, repository }))
  routes.get('/games/:gameId/players', adminGetGamePlayersController({ parseParams, logger, repository }))
  routes.delete('/games/:gameId', adminRemoveGameController({ parseParams, logger, repository }))
  routes.post('/games/:gameId/questions', adminSaveGameQuestionsController({ parseParams, logger, repository }))

  // Players
  routes.post('/game/join', playerJoinGameController({ parseParams, logger, repository }))

  // TEST
  routes.get('/game/insert', gameInsertController({ parseParams, logger, repository }))

  return routes
}

module.exports = { createRouter }

const gameInsertController =
  ({ repository }) =>
    async (req, res) => {
      // await repository.admin.removeAdminGame({ adminId: 3, gameId })
      const admin = await repository.admin.getAdmin({ adminSubId: '103093551473053600000' })
      const rootGame = await repository.game.getGame({gameId:"G913D"})

      const gameId = Math.random().toString(36).slice(2, 7).toUpperCase()
      const game = {
        id_games: gameId,
        admins_id: admin.adminId,
        game_name: 'Testing Best Practices',
        game_status: '{"status":"CREATED","currentQuestionNumber":null,"currentQuestion":null,"currentQuestionStart":null}',
        game_questions: rootGame.gameQuestions,
      }

      await repository.game.gameInsert(game)

      return res.status(200).json({ message: 'Game inserted' })
    }
