import type { PageLoad } from './$types'

import { getGame } from '$lib/infrastructure/http/admin/adminHTTP'

export const load = ((params) => {
  const gameId = params.url.searchParams.get('gameId')
  if (!gameId) throw new Error('gameId is required')
  return getGame(gameId)
}) satisfies PageLoad
