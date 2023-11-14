const { z } = require('zod')

module.exports = z.object({
  gameId: z.string(),
  gameQuestions: z.array(
    z.object({
      questionId: z.string(),
      question: z.string(),
      answers: z.array(
        z.object({
          answer: z.string(),
          isCorrect: z.boolean(),
        }),
      ),
      time: z.string(),
    }),
  ),
})
