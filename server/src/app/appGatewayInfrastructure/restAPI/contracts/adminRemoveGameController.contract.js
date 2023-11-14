const { z } = require('zod')

module.exports = z.object({
  gameId: z.string(),
  adminId: z.number(),
})
