<script lang="ts">
  import { goto } from '$app/navigation'
  import { createGame } from '$lib/infrastructure/http/admin/adminHTTP'
  import Error from '../components/Error.svelte'

  let gameName: string = $state('')
  let createError: boolean = $state(false)

  const createGameHandler = async () => {
    try {
      const gameId = await createGame(gameName)
      goto(`/juego/editar?gameId=${gameId}`)
    } catch (error) {
      createError = true
    }
  }
</script>

<svelte:head>
  <title>Crear Juego</title>
</svelte:head>

<div class="mx-auto w-5/6">
  <main class="card text-neutral-content">
    {#if createError}
      <Error error="Disculpas! No se ha podido crear el juego" />
    {/if}

    <div class="card-body items-center text-center">
      <input
        id="game-name"
        type="text"
        bind:value={gameName}
        placeholder="Nombre"
        class="input input-bordered input-accent w-full max-w-xs text-center {createError
          ? 'input-error'
          : ''}"
        autocomplete="off"
      />

      <button
        onclick={() => createGameHandler()}
        class="btn btn-outline btn-success mt-5 w-full max-w-xs"
        disabled={gameName.length > 0 ? false : true}>Crear</button
      >
    </div>
  </main>
</div>
