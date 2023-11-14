<script lang="ts">
  import { manageGame } from '$lib/infrastructure/websockets/admin/adminWSActions'

  import type { Socket } from 'socket.io-client'
  import type { Game } from '../../../../../@types/game'

  import ResultsGame from './ResultsGame.svelte'

  const nextQuestionGame = (socket: Socket, game: Game) => () => {
    if (game === null || game.gameId === null) {
      // set error
      console.log('Error al iniciar la pregunta')
      return false
    }

    return manageGame(socket, game.gameId, 'GAME_QUESTION', null)
  }

  export let socket: Socket
  export let game: Game
</script>

<div class="mx-auto text-center">
  <button
    on:click={nextQuestionGame(socket, game)}
    class="btn btn-success mb-5 w-full max-w-xs">Siguiente pregunta 🚀</button
  >
  <ResultsGame />
</div>
