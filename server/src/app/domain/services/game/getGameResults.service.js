const calculateExponentialScore = (questionTime, answerTime) => {
  // Define a base score (you can adjust this as needed)
  const baseScore = 1000

  // Calculate the time difference in seconds
  const timeDifferenceInSeconds = (answerTime - questionTime) / 1000 // assuming timestamps are in milliseconds

  // Define the exponent and scaling factor (you can adjust these values)
  const exponent = -0.1 // Adjust the exponent for different curves
  const scalingFactor = 3

  // Calculate the exponential score
  const score = baseScore * Math.exp(exponent * timeDifferenceInSeconds) * scalingFactor

  return score
}

const getGameResultsService = async (db, { gameId }) => {
  const gameQuestionsString = await db.admin.getAdminGameQuestions({ gameId })
  const gameQuestions = gameQuestionsString ? JSON.parse(gameQuestionsString) : null
  if (!gameQuestions) return { players: [] }

  const gameAnswers = await db.admin.getAdminGameAnswers({ gameId })

  const correctAnswers = {}
  gameQuestions.forEach((question) => {
    correctAnswers[question.questionId] = question.answers.filter((answer) => answer.isCorrect).map(({ answerId }) => answerId)
  })

  const playersQuestions = gameAnswers.reduce((acc, answer) => {
    if (!answer.gameAnswer) {
      acc[answer.playerName] = {
        score: 0,
        correctAnswers: 0,
        totalAnswersTime: 0,
      }
    } else {
      if (correctAnswers[answer.gameQuestion].includes(answer.gameAnswer)) {
        const questionTime = new Date(answer.gameQuestionStartedAt)
        const answerTime = new Date(answer.gameAnswerCreatedAt)

        const score = calculateExponentialScore(questionTime, answerTime)
        const answerScore = acc[answer.playerName] ? acc[answer.playerName] + score : score
        acc[answer.playerName] = {
          score: answerScore,
          correctAnswers: acc[answer.playerName] ? acc[answer.playerName].correctAnswers + 1 : 1,
          totalAnswersTime: acc[answer.playerName]
            ? acc[answer.playerName].totalAnswersTime + (answerTime - questionTime) / 1000
            : (answerTime - questionTime) / 1000,
        }
      }
    }
    return acc
  }, {})

  const playersResults = Object.entries(playersQuestions).map(([playerName, results]) => ({
    name: playerName,
    score: results.score,
    correctAnswers: results.correctAnswers,
    totalAnswersTime: results.totalAnswersTime,
  }))

  playersResults.sort((a, b) => b.score - a.score)

  return playersResults
}

module.exports = { getGameResultsService }
