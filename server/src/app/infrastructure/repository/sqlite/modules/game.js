const GAMES_TABLE = 'games'
const PLAYERS_TABLE = 'players'

const createGame =
  (db) =>
    async (adminId, { gameName, gameStatus }) => {
      const gameId = Math.random().toString(36).slice(2, 7).toUpperCase()

      await db(GAMES_TABLE).insert({
        id_games: gameId,
        admins_id: adminId,
        game_name: gameName,
        game_status: gameStatus,
      })

      return { gameId }
    }

const getGame =
  (db) =>
    ({ gameId }) =>
      db(GAMES_TABLE)
        .select(
          'id_games as gameId',
          'admins_id as adminId',
          'game_name as gameName',
          'game_questions as gameQuestions',
          'game_created_at as gameCreatedAt',
          'game_status as gameStatus',
        )
        .where({ id_games: gameId })
        .first()

const getGameQuestions =
  (db) =>
    async ({ gameId }) => {
      const game = await db(GAMES_TABLE)
        .select('game_questions as gameQuestions')
        .where({ id_games: gameId })
        .first()
      return game.gameQuestions
    }

const getGameStatus =
  (db) =>
    async ({ gameId }) => {
      const game = await db(GAMES_TABLE).select('game_status as gameStatus').where({ id_games: gameId }).first()
      return game.gameStatus
    }

const saveGameQuestions = (db) => (gameId, gameQuestions) =>
  db(GAMES_TABLE)
    .where({ id_games: gameId })
    .update({ game_questions: JSON.stringify(gameQuestions) })

const saveGameStatus = (db) => (gameId, gameStatus) =>
  db(GAMES_TABLE)
    .where({ id_games: gameId })
    .update({ game_status: JSON.stringify(gameStatus) })

const getGamePlayerAnswers = (db) => async (playerId, gameId) =>
  db('games_answers')
    .select('game_question as gameQuestion', 'game_answer as gameAnswer')
    .where({ players_id: playerId, games_id: gameId })

const getGamePlayerAnswer = (db) => async (playerId, gameId, questionId) =>
  db('games_answers')
    .select('players_id as playerId', 'game_answer as gameAnswer')
    .where({ players_id: playerId, games_id: gameId, game_question: questionId })
    .first()

const saveGamePlayerAnswer = (db) => async (playerId, gameId, questionId, currentQuestionStart, answerId) =>
  db('games_answers').insert({
    players_id: playerId,
    games_id: gameId,
    game_question: questionId,
    game_question_started_at: currentQuestionStart,
    game_answer: answerId,
    game_answer_created_at: new Date().toISOString(),
  })

const getGamePlayersConnected =
  (db) =>
    async ({ gameId }) =>
      db(PLAYERS_TABLE).select('player_name as playerName').where({ games_id: gameId, player_connected: true })

const getGamePlayersDisconnected =
  (db) =>
    async ({ gameId, socketIdsConnected }) =>
      db(PLAYERS_TABLE)
        .pluck('id_players')
        .where({ games_id: gameId })
        .whereNotIn('player_socket_id', socketIdsConnected)

const gameInsert = (db) => async (game) => db('games').insert(game)

module.exports = (db) => ({
  createGame: createGame(db),
  getGame: getGame(db),
  getGameQuestions: getGameQuestions(db),
  getGameStatus: getGameStatus(db),
  saveGameQuestions: saveGameQuestions(db),
  saveGameStatus: saveGameStatus(db),
  getGamePlayerAnswers: getGamePlayerAnswers(db),
  getGamePlayerAnswer: getGamePlayerAnswer(db),
  saveGamePlayerAnswer: saveGamePlayerAnswer(db),
  getGamePlayersConnected: getGamePlayersConnected(db),
  getGamePlayersDisconnected: getGamePlayersDisconnected(db),
  gameInsert: gameInsert(db),
})
