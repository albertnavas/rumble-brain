import type { Socket } from 'socket.io-client'
import { writable, type Writable } from 'svelte/store'
import type { Game, GamePlayerAnswers, GamePlayers, GameResults } from '../@types/game'
import type { ErrorStore, PlayerConnectionData } from '../@types/global'

export const errorStore: Writable<ErrorStore> = writable(null)

export const socket: Writable<Socket | null> = writable(null)

export const gameState: Writable<Game> = writable(null)

export const playersState: Writable<GamePlayers> = writable([])

export const gamePlayerState: Writable<Game> = writable(null)

export const gamePlayerAnswersState: Writable<GamePlayerAnswers> = writable({})

export const gameResultsState: Writable<GameResults> = writable([])

export const playerConnectionDataState: Writable<PlayerConnectionData> = writable(null)
