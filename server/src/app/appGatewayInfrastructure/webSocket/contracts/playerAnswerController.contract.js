const { z } = require('zod')

module.exports = z.object({
  socketId: z.string(),
  gameId: z.string(),
  playerConnectionToken: z.string(),
  questionId: z.string(),
  answerId: z.string(),
})
