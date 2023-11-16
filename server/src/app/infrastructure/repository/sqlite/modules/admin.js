const ADMINS_TABLE = 'admins'
const GAMES_TABLE = 'games'
const GAMES_ANSWERS_TABLE = 'games_answers'
const PLAYERS_TABLE = 'players'

const getAdmin =
  (db) =>
    ({ adminSubId }) =>
      db(ADMINS_TABLE).select('id_admins as adminId', 'admin_sub_id as adminSubId').where({ admin_sub_id: adminSubId }).first()

const createAdmin = (db) => async (adminData) =>
  await db(ADMINS_TABLE).insert({
    admin_sub_id: adminData.adminSubId,
    admin_name: adminData.adminName,
    admin_email: adminData.adminEmail,
  })

const isAdminGame =
  (db) =>
    ({ adminId, gameId }) =>
      db(GAMES_TABLE).select('id_games as gameId').where({ admins_id: adminId, id_games: gameId }).first()

const removeAdminGame =
  (db) =>
    ({ adminId, gameId }) =>
      db(GAMES_TABLE).where({ admins_id: adminId, id_games: gameId }).del()

const getAdminGames =
  (db) =>
    ({ adminId }) =>
      db(GAMES_TABLE)
        .select('id_games as gameId', 'game_name as gameName', 'game_created_at as gameCreatedAt', 'game_questions as gameQuestions', 'game_status as gameStatus')
        .where({ admins_id: adminId })

const getAdminGameAnswers =
  (db) =>
    ({ gameId }) =>
      db(PLAYERS_TABLE)
        .select(
          'players.player_name as playerName',
          'games_answers.game_question as gameQuestion',
          'games_answers.game_question_started_at as gameQuestionStartedAt',
          'game_answer as gameAnswer',
          'game_answer_created_at as gameAnswerCreatedAt',
        )
        .where('players.games_id', gameId)
        .leftJoin(GAMES_ANSWERS_TABLE, 'games_answers.players_id', 'players.id_players')

const getAdminGameQuestions =
  (db) =>
    async ({ gameId }) => {
      const game = await db(GAMES_TABLE).select('game_questions as gameQuestions').where({ id_games: gameId }).first()
      return game.gameQuestions
    }
const removeAdminGamePlayers =
  (db) =>
    async ({ gameId, playersIds }) =>
      db(PLAYERS_TABLE).where('games_id', gameId).where('player_socket_id', null).orWhereIn('id_players', playersIds).del()

const removeAdminGamePlayersAnswers =
  (db) =>
    async ({ gameId }) =>
      db(GAMES_ANSWERS_TABLE).where('games_id', gameId).del()

module.exports = (db) => ({
  getAdmin: getAdmin(db),
  isAdminGame: isAdminGame(db),
  removeAdminGame: removeAdminGame(db),
  getAdminGames: getAdminGames(db),
  getAdminGameAnswers: getAdminGameAnswers(db),
  getAdminGameQuestions: getAdminGameQuestions(db),
  createAdmin: createAdmin(db),
  removeAdminGamePlayers: removeAdminGamePlayers(db),
  removeAdminGamePlayersAnswers: removeAdminGamePlayersAnswers(db),
})
