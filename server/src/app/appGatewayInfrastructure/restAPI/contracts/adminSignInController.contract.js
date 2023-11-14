const { z } = require('zod')

module.exports = z.object({
  token: z.string(),
})
