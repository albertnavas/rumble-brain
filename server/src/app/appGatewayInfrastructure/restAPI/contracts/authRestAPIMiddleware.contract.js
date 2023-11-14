const { z } = require('zod')

module.exports = z.object({
  authorization: z.string(),
})
