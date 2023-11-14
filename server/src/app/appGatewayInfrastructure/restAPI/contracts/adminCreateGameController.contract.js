const { z } = require('zod')

module.exports = z.object({
  gameName: z.string(),
})
