<script lang="ts">
  import { deleteGame } from '$lib/infrastructure/http/admin/adminHTTP.js'
  import type { Game } from '../../../@types/game.js'

  let showDeleteButtonKey: number | null = null

  const deleteGameUseCase = async (gameId: string) => {
    const response = await deleteGame(gameId)
    if (response) {
      showDeleteButtonKey = null
      games = games.filter((game: Game) => game?.gameId !== gameId)
    }
  }
  export let data
  let { games } = data
</script>

<svelte:head>
  <title>Juegos</title>
</svelte:head>

<div class="mx-auto w-7/12">
  {#if games.length > 0}
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each games as game, key}
            <tr>
              <td>{game.gameName}</td>
              <td>{game.gameCreatedAt}</td>
              <td>{game.gameStatus?.status || 'READY'}</td>
              <th style="text-align: center;">
                {#if showDeleteButtonKey !== key}
                  <a
                    href="/juego/editar?gameId={game.gameId}"
                    class="btn btn-info btn-xs">Editar</a
                  >
                  <a
                    href="/juego/play?gameId={game.gameId}"
                    class="btn btn-success btn-xs">Comenzar</a
                  >
                  <button
                    on:click={() => (showDeleteButtonKey = key)}
                    class="btn btn-error btn-xs">Eliminar</button
                  >
                {:else}
                  <button
                    on:click={() => deleteGameUseCase(game.gameId)}
                    class="btn btn-error btn-xs">Confirmar eliminar</button
                  >
                {/if}
              </th>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="mx-auto w-5/6">
      <div class="card-body items-center text-center">
        <p class="text-xl font-bold">No hay juegos</p>
      </div>
    </div>
  {/if}
</div>
