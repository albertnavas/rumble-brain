const { saveAdminGameQuestionsUseCase } = require('../../../../application/admin/saveAdminGameQuestions.useCase')

const schema = require('../../contracts/adminSaveGameQuestionsController.contract')

const adminSaveGameQuestionsController =
  ({ parseParams, logger, repository }) =>
    async (req, res) => {
      const parseResponse = parseParams({ data: { ...req.params, ...req.body }, schema })

      if (!parseResponse.validation) {
        return res.status(400).json({ status: false, message: parseResponse.error })
      }

      const { gameId, gameQuestions } = parseResponse.data

      if (!gameId || !gameQuestions) {
        logger.error(req.body, 'Missing some params gameId || gameQuestions')
        return res.status(400).json({
          error: true,
          type: 'ADMIN_CREATE_MISSING_PARAMS',
          message: 'Faltan los parámetros obligatorios',
        })
      }

      const responseSaveAdminGameQuestions = await saveAdminGameQuestionsUseCase(
        { logger, repository },
        {
          gameId,
          gameQuestions,
        },
      )

      if (!responseSaveAdminGameQuestions.status) {
        return res.status(400).json({
          error: true,
          type: 'ADMIN_SAVE_GAME_QUESTIONS_ERROR',
          message: 'Error al guardar las preguntas',
        })
      }

      return res.status(200).json(true)
    }

module.exports = { adminSaveGameQuestionsController }
