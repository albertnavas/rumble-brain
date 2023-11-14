import type { PageLoad } from './$types'

import { getGame, getGamePlayers } from '$lib/infrastructure/http/admin/adminHTTP'

export const load = ((params) => {
  const gameId = params.url.searchParams.get('gameId')
  if (!gameId) throw new Error('gameId is required')

  const game = getGame(gameId)
  const gamePlayers = getGamePlayers(gameId)

  return { game, gamePlayers }
}) satisfies PageLoad
