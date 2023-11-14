const GAMES_STATUS_TRACKING = 'games_status_tracking'

const insertGameStatusTracking = (db) => (gameId, status) =>
  db(GAMES_STATUS_TRACKING).insert({
    games_id: gameId,
    game_status: status,
  })

const removeGameStatusTracking = (db) => ({ gameId }) =>
  db(GAMES_STATUS_TRACKING).where({ games_id: gameId }).del()

module.exports = (db) => ({
  insertGameStatusTracking: insertGameStatusTracking(db),
  removeGameStatusTracking: removeGameStatusTracking(db),
})
