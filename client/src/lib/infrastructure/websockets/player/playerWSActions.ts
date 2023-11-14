import type { PlayerConnectionData } from '../../../../@types/global'
import { initWS } from './playerWSHandlers'

import { playerConnectionDataState } from '$lib/store'
import type { GamePlayerAnswer } from '../../../../@types/game'

const joinGame = (playerConnectionData: PlayerConnectionData) => {
  const socket = initWS()

  if (socket === null) {
    localStorage.removeItem('playerConnectionData')
    return false
  }

  socket.emit('joinPlayer', playerConnectionData)

  localStorage.setItem('playerConnectionData', JSON.stringify(playerConnectionData))

  playerConnectionDataState.set(playerConnectionData)

  return true
}

const sendPlayerAnswer = async (playerAnswer: GamePlayerAnswer) => {
  const socket = initWS()

  const { playerConnectionToken, gameId, questionId, answerId } = playerAnswer

  socket.emit('playerAnswer', { playerConnectionToken, gameId, questionId, answerId })
}

export { joinGame, sendPlayerAnswer }
