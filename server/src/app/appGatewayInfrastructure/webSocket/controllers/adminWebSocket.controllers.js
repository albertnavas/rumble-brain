const { adminGameManageController } = require('./admin/adminGameManage.controller')
const { adminDisconnectController } = require('./admin/adminDisconnect.controller')
const { cleanGameDataController } = require('./admin/cleanGameData.controller')
const adminWebSocketControllers =
  (io, { parseParams, logger, repository }) =>
    (socket) => {
      socket.on('disconnect', adminDisconnectController(io, socket, { parseParams, logger }))
      socket.on('gameManage', adminGameManageController(io, socket, { parseParams, logger, repository }))
      socket.on('gameClean', cleanGameDataController(io, socket, { parseParams, logger, repository }))
    }

module.exports = { adminWebSocketControllers }
