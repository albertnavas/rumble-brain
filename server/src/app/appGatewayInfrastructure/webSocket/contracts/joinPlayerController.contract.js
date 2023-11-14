const { z } = require('zod')

module.exports = z.object({
  socketId: z.string(),
  gameId: z.string(),
  playerName: z.string(),
  playerConnectionToken: z.string(),
})
