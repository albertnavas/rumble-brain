import config from '$lib/config'

import { io, type Socket } from 'socket.io-client'
import { gameResultsState, gameState, playersState, socket } from '../../../store'

import type { Game, GamePlayers } from '../../../../@types/game'

import type { ErrorStore } from '../../../../@types/global'

export const adminHandler = (socketIO: Socket) => {
  socketIO.on('connect', () => {
    // console.log("connected")
  })

  socketIO.on('error', (error: ErrorStore) => {
    if (!error) return
    console.log('admin error', error)
  })

  socketIO.on('game', (game: Game) => {
    gameState.set(game)
  })

  socketIO.on('players', (players: GamePlayers) => {
    playersState.set(players)
  })

  socketIO.on('results', (results) => {
    gameResultsState.set(results)
  })

  socketIO.on('player_left', (playerName) => {
    console.log(`${playerName} left the game`)
  })
}

export const initWS = (gameId: string) => {
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) throw new Error('No user info found')
  const socketIO = io(`${config.serverUrl}/admin`, {
    auth: {
      token: JSON.parse(userInfo).token,
      gameId,
    },
  })
  socket.set(socketIO)

  adminHandler(socketIO)

  return socketIO
}
