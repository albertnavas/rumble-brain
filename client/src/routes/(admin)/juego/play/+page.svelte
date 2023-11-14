<script lang="ts">
  import FinalResultsGame from './components/FinalResultsGame.svelte'
  import GameQuestion from './components/QuestionGame.svelte'
  import QuestionResultsGame from './components/QuestionResultsGame.svelte'
  import WaitingGame from './components/WaitingGame.svelte'

  import { gameState, playersState } from '$lib/store'
  import type { Socket } from 'socket.io-client'

  import type { Game, GamePlayers } from '../../../../@types/game'

  import { playGame } from '$lib/infrastructure/websockets/admin/adminWSActions'

  // import lonelinessSong from "$lib/assets/loneliness-8-bit.mp3";

  export let data
  const game: Game = data.game
  const gamePlayers: GamePlayers = data.gamePlayers

  let socket: Socket

  if (game) {
    gameState.set(game)
    playersState.set(gamePlayers)

    // Init WS
    socket = playGame(game.gameId)
  }
</script>

<svelte:head>
  <title>{game?.gameId} Game</title>
</svelte:head>

<!-- <audio id="player" autoplay loop>
	<source src={lonelinessSong} type="audio/mp3" />
</audio> -->

{#if $gameState?.gameStatus?.status === 'GAME_RESULTS'}
  <FinalResultsGame />
{:else if $gameState?.gameStatus?.status === 'GAME_QUESTION'}
  <GameQuestion {socket} {game} />
{:else if $gameState?.gameStatus?.status === 'GAME_QUESTION_RESULTS'}
  <QuestionResultsGame {socket} {game} />
{:else if $gameState}
  <WaitingGame {socket} {game} />
{/if}
