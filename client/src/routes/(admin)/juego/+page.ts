import type { PageLoad } from './$types'

import { getGames } from '$lib/infrastructure/http/admin/adminHTTP'

export const load = (async () => {
  const games = await getGames()

  if (games.error) throw new Error(games.code)

  return { games }
}) satisfies PageLoad
