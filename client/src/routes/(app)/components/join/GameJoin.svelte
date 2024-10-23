<script lang="ts">
  import { playerJoinGame } from '$lib/infrastructure/http/player/playerHTTP'
  import { errorStore } from '$lib/store'

  import Error from '../Error.svelte'

  let playerName = $state('')

  interface Props {
    gameId: string;
  }

  let { gameId = $bindable() }: Props = $props();
</script>

<svelte:head>
  <title>Unirse a un Juego</title>
</svelte:head>

<div class="mx-auto w-5/6">
  <Error />
  <div class="card-body form-control items-center justify-center">
    <label class="input-group input-group-vertical items-center">
      <span class="w-full max-w-xs">Juego ID</span>
      <input
        id="game-id"
        type="text"
        bind:value={gameId}
        oninput={() => (gameId = gameId.toUpperCase())}
        placeholder="Introduce el ID del juego"
        class="input input-bordered input-accent w-full max-w-xs text-center outline-none focus:outline-none {$errorStore?.type ===
        'GAME_NOT_FOUND'
          ? 'input-error'
          : ''}"
        autocomplete="off"
      />
    </label>
    <label class="input-group input-group-vertical items-center">
      <span class="w-full max-w-xs">Nombre</span>
      <input
        id="player-name"
        type="text"
        bind:value={playerName}
        placeholder="Escoge tu nombre"
        class="input input-bordered input-accent w-full max-w-xs text-center outline-none focus:outline-none {$errorStore?.type ===
        'PLAYER_NAME_ALREADY_EXISTS'
          ? 'input-error'
          : ''}"
        autocomplete="off"
      />
    </label>

    <button
      onclick={() => playerJoinGame(gameId, playerName)}
      class="btn btn-outline btn-success mt-5 w-full max-w-xs"
      disabled={gameId.length > 0 && playerName.length > 0 ? false : true}
      >Unirse</button
    >
  </div>
</div>
