const saveGameQuestionsService = (repository, { gameId, gameQuestions }) => {
  return repository.game.saveGameQuestions(gameId, gameQuestions)
}

module.exports = { saveGameQuestionsService }
