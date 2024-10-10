const { z } = require('zod')

module.exports = z.object({
  gameId: z.string(),
  gameQuestions: z.array(
    z.object({
      questionId: z.string(),
      question: z.string(),
      answers: z.array(
        z.object({
          answerId: z.string(),
          answer: z.string(),
          isCorrect: z.boolean(),
        }),
      ),
      time: z.string(),
    }),
  ),
})
