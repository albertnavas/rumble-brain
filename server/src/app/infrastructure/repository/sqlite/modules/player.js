const PLAYERS_TABLE = 'players'

const getPlayer =
  (db) =>
    ({ gameId, playerName }) =>
      db(PLAYERS_TABLE)
        .select(
          'id_players as idPlayers',
          'player_name as playerName',
          'player_connection_token as playerConnectionToken',
        )
        .where({ games_id: gameId, player_name: playerName })
        .first()

const createPlayer =
  (db) =>
    async ({ gameId, playerName }) => {
      const playerConnectionToken = Math.random().toString(36).slice(2, 15)

      await db(PLAYERS_TABLE).insert({
        player_name: playerName,
        player_connection_token: playerConnectionToken,
        player_connected: false,
        games_id: gameId,
      })

      return { playerConnectionToken }
    }

const savePlayer = (db) => (gameId, playerName, updateData) =>
  db(PLAYERS_TABLE).where({ games_id: gameId, player_name: playerName }).update(updateData)

const getPlayerBySocketId =
  (db) =>
    async ({ socketId }) =>
      db(PLAYERS_TABLE)
        .select('games_id as gamesId', 'player_name as playerName')
        .where({ player_socket_id: socketId })
        .first()

const getPlayerByConnectionToken =
  (db) =>
    async ({ playerConnectionToken }) =>
      db(PLAYERS_TABLE)
        .select('id_players as idPlayers', 'player_name as playerName')
        .where({ player_connection_token: playerConnectionToken })
        .first()

module.exports = (db) => ({
  getPlayer: getPlayer(db),
  createPlayer: createPlayer(db),
  savePlayer: savePlayer(db),
  getPlayerBySocketId: getPlayerBySocketId(db),
  getPlayerByConnectionToken: getPlayerByConnectionToken(db),
})
