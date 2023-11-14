const schemaValidation = ({ logger }) => {
  const parseParams = ({ data, schema }) => {
    try {
      const parsedData = schema.parse(data)
      return { validation: true, data: parsedData }
    } catch (error) {
      logger.error(error.message)
      return { validation: false, error: 'Invalid fields' }
    }
  }

  return { parseParams }
}

module.exports = { schemaValidation }
