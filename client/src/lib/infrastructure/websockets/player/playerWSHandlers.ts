import config from '$lib/config'

import { io, type Socket } from 'socket.io-client'
import { errorStore, gamePlayerAnswersState, gamePlayerState, playersState, socket } from '../../../store'

import type { Game, GamePlayerAnswers, GamePlayers } from '../../../../@types/game'

import type { ErrorStore } from '../../../../@types/global'

export const playerHandler = (socketIO: Socket) => {
  socketIO.on('connect', () => {
    // console.log("connected")
  })

  socketIO.on('error', (error: ErrorStore) => {
    if (!error) return

    const joinErrors = ['JOIN_GAME_NOT_FOUND', 'JOIN_WRONG_TOKEN', 'JOIN_FAILED']
    if (joinErrors.includes(error.type)) {
      gamePlayerState.set(null)
      localStorage.removeItem('playerConnectionData')
    }
    errorStore.set(error)
  })

  socketIO.on('game', (game: Game) => {
    gamePlayerState.set(game)
  })

  socketIO.on('playerAnswers', (gamePlayerAnswers: GamePlayerAnswers) => {
    gamePlayerAnswersState.set(gamePlayerAnswers)
  })

  socketIO.on('players', (players: GamePlayers) => {
    playersState.set(players)
  })

  socketIO.on('player_left', (playerName) => {
    console.log(`${playerName} left the game`)
  })
}

export const initWS = () => {
  errorStore.set(null)

  const socketIO = io(`${config.serverUrl}/player`)
  socket.set(socketIO)

  playerHandler(socketIO)

  return socketIO
}
