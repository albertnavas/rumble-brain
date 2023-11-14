const knex = require('knex')

const knexConfig = require('./sqliteKnexConfig')

const admin = require('./modules/admin')
const player = require('./modules/player')
const game = require('./modules/game')
const gameStatusTracking = require('./modules/gameStatusTracking')

module.exports = (sqliteConfig) => {
  const knexInstance = knex(knexConfig(sqliteConfig))

  return {
    admin: admin(knexInstance),
    player: player(knexInstance),
    game: game(knexInstance),
    gameStatusTracking: gameStatusTracking(knexInstance),
  }
}
