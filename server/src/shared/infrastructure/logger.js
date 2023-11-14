const pino = require('pino')

const pinoEnvironmentsConfig = {
  local: {
    level: process.env.PINO_LOG_LEVEL || 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  },
  default: {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      bindings: (bindings) => {
        return {
          node: process.version,
          pid: process.pid,
          hostname: bindings.hostname,
          environment: bindings.environment,
        }
      },
      level: (label) => {
        return { level: label.toUpperCase() }
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
}

const createLogger = (config) => {
  let pinoConfig
  config.environment === 'local' ? (pinoConfig = pinoEnvironmentsConfig.local) : (pinoConfig = pinoEnvironmentsConfig.default)

  const logger = pino(pinoConfig)

  return logger
}

module.exports = { createLogger }
