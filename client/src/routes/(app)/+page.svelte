<script lang="ts">
  import { page } from '$app/stores'
  import { gamePlayerState } from '$lib/store'

  import GameJoin from './components/join/GameJoin.svelte'
  import GameJoinNav from './components/join/GameJoinNav.svelte'

  import GamePlayerNav from './components/GamePlayerNav.svelte'
  import GameWaitingRoom from './components/waiting/GameWaitingRoom.svelte'

  import GameQuestion from './components/question/GameQuestion.svelte'

  import GamePlayerResults from './components/results/GamePlayerResults.svelte'

  import { joinGame } from '$lib/infrastructure/websockets/player/playerWSActions'
  import type { AdminInfo } from '../../@types/global'

  const gameIdParam = $page.url.searchParams.get('gameId')
  let gameId = gameIdParam?.toUpperCase() || ''

  const playerConnectionDataString = localStorage.getItem(
    'playerConnectionData',
  )

  if (playerConnectionDataString) {
    const playerConnectionData = JSON.parse(playerConnectionDataString)
    if (playerConnectionData.gameId !== gameId) {
      localStorage.removeItem('playerConnectionData')
    }
    joinGame(playerConnectionData)
  }
  export let data
  const adminInfo: AdminInfo = data.adminInfo || null
</script>

{#if !$gamePlayerState}
  <GameJoinNav {adminInfo} />
  <GameJoin {gameId} />
{:else if $gamePlayerState.currentQuestion?.question}
  <GamePlayerNav />
  <GameQuestion />
{:else if $gamePlayerState.gameStatus?.status === 'GAME_RESULTS'}
  <GamePlayerNav />
  <GamePlayerResults />
{:else}
  <GamePlayerNav />
  <GameWaitingRoom />
{/if}
