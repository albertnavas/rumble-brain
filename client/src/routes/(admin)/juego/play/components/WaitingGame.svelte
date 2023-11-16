<script lang="ts">
  import { playersState } from '$lib/store'
  import QRCode from 'qrcode'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  import { manageGame } from '$lib/infrastructure/websockets/admin/adminWSActions'

  import type { Socket } from 'socket.io-client'
  import type { Game } from '../../../../../@types/game'
  import { goto } from '$app/navigation'

  export let socket: Socket
  export let game: Game

  if (!game?.gameQuestions || game?.gameQuestions.length === 0) {
    const editGameURL = `/juego/editar?gameId=${game?.gameId}`
    goto(editGameURL)
  }

  const startGame = (socket: Socket, game: Game) => () => {
    if (game === null || game.gameId === null) {
      // set error
      console.log('Error al iniciar el juego')
      return false
    }

    return manageGame(socket, game.gameId, 'GAME_QUESTION', null)
  }

  const joinUrl = `${window.location.origin}/?gameId=${game?.gameId}`
  onMount(() => {
    QRCode.toCanvas(document.getElementById('canvas'), joinUrl, {
      version: 4,
    })
  })
</script>

<div class="mx-auto w-2/6 text-center">
  <div class="mb-4">
    <h1 class="text-2xl">Únete</h1>
    <canvas id="canvas" class="m-auto" />
    <p>{joinUrl}</p>
    <div class="badge badge-info badge-lg mt-4 p-5 text-2xl">
      {game?.gameId}
    </div>
  </div>
  <div class="mb-6">
    <button on:click={startGame(socket, game)} class="btn btn-success w-full"
      >Empezar 🚀</button
    >
  </div>

  {#if game}
    <div in:fly={{ x: '-100%', duration: 500 }}>
      <div class="divider w-full">Jugadores</div>
      <span class="loading loading-ring loading-lg" />
      <div class="mx-auto mt-2 w-4/6">
        {#if $playersState && $playersState.length > 0}
          {#each $playersState as player}
            <div class="badge badge-outline ml-2 mr-2">{player}</div>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    Error al cargar datos de los juegos
  {/if}
</div>
