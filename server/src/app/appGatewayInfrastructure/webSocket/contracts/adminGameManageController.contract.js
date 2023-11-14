const { z } = require('zod')

module.exports = z.object({
  adminId: z.number(),
  gameId: z.string(),
  status: z.string(),
})
