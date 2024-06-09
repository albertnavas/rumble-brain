import type { PageLoad } from './$types'

import { getGame } from '$lib/infrastructure/http/admin/adminHTTP'

export const load = (async (params) => {
  const gameId = params.url.searchParams.get('gameId')
  if (!gameId) throw new Error('gameId is required')
  return await getGame(gameId)
}) satisfies PageLoad
