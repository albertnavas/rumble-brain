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
      await repository.admin.removeAdminGame({ adminId: 1, gameId: 'KIRA' })
      const admin = await repository.admin.getAdmin({ adminSubId: '101863454080879012553' })
      const gameQuestions =
      '[{"questionId":"1w4g","question":"¿Cuantos años tengo?","answers":[{"answerId":"1w4g-1","answer":"33","isCorrect":true},{"answerId":"1w4g-2","answer":"12","isCorrect":false},{"answerId":"1w4g-3","answer":"54","isCorrect":false},{"answerId":"1w4g-4","answer":"45","isCorrect":false}],"time":"20"},{"questionId":"u2ej","question":"¿Nombre de mi perro?","answers":[{"answerId":"u2ej-1","answer":"Baxter","isCorrect":true},{"answerId":"u2ej-2","answer":"Tor","isCorrect":false},{"answerId":"u2ej-3","answer":"Kira","isCorrect":false},{"answerId":"u2ej-4","answer":"Cuca","isCorrect":false}],"time":"10"},{"questionId":"idea","question":"¿Pokemons?","answers":[{"answerId":"idea-1","answer":"Pikachu","isCorrect":true},{"answerId":"idea-2","answer":"Venom","isCorrect":false},{"answerId":"idea-3","answer":"Bulma","isCorrect":false},{"answerId":"idea-4","answer":"Ratata","isCorrect":true}],"time":"10"}]'
      const game = {
        id_games: 'KIRA',
        admins_id: admin.adminId,
        game_name: 'Kira Game',
        game_status: '{}',
        game_questions: gameQuestions,
      }

      await repository.game.gameInsert(game)

      return res.status(200).json({ message: 'Game inserted' })
    }
