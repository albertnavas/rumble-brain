import fetchJson from '$lib/infrastructure/http/fetchJson'
import { joinGame } from '$lib/infrastructure/websockets/player/playerWSActions'
import { errorStore } from '$lib/store'

const playerJoinGame = async (gameId: string, playerName: string) => {
  const joinRes = await fetchJson('/game/join', 'POST', { gameId, playerName })

  if (joinRes.error) {
    errorStore.set({ type: joinRes.type, message: joinRes.message })
    return false
  }

  if (!joinRes.gameId || !joinRes.playerName || !joinRes.playerConnectionToken) {
    console.error('Missing fields in playerJoinGame', joinRes)
    errorStore.set({ type: 'error', message: 'Missing fields in playerJoinGame' })
    return false
  }

  return joinGame({
    gameId: joinRes.gameId,
    playerName: joinRes.playerName,
    playerConnectionToken: joinRes.playerConnectionToken,
  })
}

export { playerJoinGame }
