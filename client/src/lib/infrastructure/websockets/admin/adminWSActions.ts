import type { Socket } from 'socket.io-client'
import { initWS } from './adminWSHandlers'

const playGame = (gameId: string) => {
  const socket = initWS(gameId)

  socket.emit('gameClean', { gameId })

  return socket
}

const manageGame = (socket: Socket, gameId: string, status: string, questionId: string | null) => {
  socket.emit('gameManage', { gameId, status, questionId })
}

export { manageGame, playGame }
