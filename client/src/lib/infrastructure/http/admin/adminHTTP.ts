import fetchJson from '$lib/infrastructure/http/fetchJson'
import { error } from '@sveltejs/kit'

import type { GameQuestion } from '../../../../@types/game'

const adminSignIn = async (token: string) => {
  const adminSignInRes = await fetchJson('/admin/signin', 'POST', { token })

  if (!adminSignInRes.status) {
    error(500, 'Admin sign in failed');
  }

  return true
}

const createGame = async (gameName: string) => {
  const createGameRes = await fetchJson('/game/create', 'POST', { gameName })

  if (!createGameRes.gameId) {
    error(500, 'Game creation failed');
  }

  return createGameRes.gameId
}

const getGames = () => fetchJson('/games', 'GET', {})

const getGame = (gameId: string) => fetchJson(`/games/${gameId}`, 'GET', {})

const getGamePlayers = (gameId: string) => fetchJson(`/games/${gameId}/players`, 'GET', {})

const deleteGame = (gameId: string) => fetchJson(`/games/${gameId}`, 'DELETE', {})

const saveGameQuestions = async (gameId: string, gameQuestions: GameQuestion[]) => {
  const updateGameQuestionsRes = await fetchJson(`/games/${gameId}/questions`, 'POST', { gameQuestions })

  if (!updateGameQuestionsRes) return false

  return true
}

export { adminSignIn, createGame, deleteGame, getGame, getGamePlayers, getGames, saveGameQuestions }
