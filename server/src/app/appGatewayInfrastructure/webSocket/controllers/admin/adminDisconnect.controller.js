const adminDisconnectController =
  (io, socket, { logger }) =>
    () => {
      logger.info('❌ ADMIN - disconnected ❌')
    }

module.exports = { adminDisconnectController }
