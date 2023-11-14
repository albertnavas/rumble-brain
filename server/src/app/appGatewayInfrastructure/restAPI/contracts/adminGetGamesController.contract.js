const { z } = require('zod')

module.exports = z.object({
  adminId: z.number(),
})
