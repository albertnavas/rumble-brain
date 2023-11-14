const getPlayerNextQuestionService = async (game) => {
  const currentQuestion = {
    questionNumber:  null,
    questionStart: null,
    currentQuestion: null,
    question: null,
  }

  if (!game.gameStatus.currentQuestionNumber) {
    currentQuestion.question = game.gameQuestions[0]
    currentQuestion.questionNumber = 1
    currentQuestion.currentQuestion = game.gameQuestions[0].questionId
  } else {
    let actualQuestionIndex = game.gameStatus.currentQuestionNumber - 1
    let nextQuestionIndex = actualQuestionIndex + 1

    currentQuestion.question = game.gameQuestions[nextQuestionIndex]
    currentQuestion.questionNumber = game.gameStatus.currentQuestionNumber + 1
    currentQuestion.currentQuestion = game.gameQuestions[nextQuestionIndex].questionId
  }

  return currentQuestion
}

module.exports = { getPlayerNextQuestionService }