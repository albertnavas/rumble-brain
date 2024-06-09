import type { PageLoad } from './$types'

import { getGame, getGamePlayers } from '$lib/infrastructure/http/admin/adminHTTP'

export const load = (async (params) => {
  const gameId = params.url.searchParams.get('gameId')
  if (!gameId) throw new Error('gameId is required')

  const game = await getGame(gameId)
  const gamePlayers = await getGamePlayers(gameId)

  return { game, gamePlayers }
}) satisfies PageLoad
