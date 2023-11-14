const { z } = require('zod')

module.exports = z.object({
  socketId: z.string(),
  reason: z.string(),
})
