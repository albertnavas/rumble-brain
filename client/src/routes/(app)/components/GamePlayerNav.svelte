<script lang="ts">
  import {
    gamePlayerState,
    playerConnectionDataState,
    socket,
  } from '$lib/store'

  function disconnect() {
    gamePlayerState.set(null)
    localStorage.removeItem('playerConnectionData')
    $socket?.close()
  }
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <button class="btn btn-ghost text-xl normal-case">rumbleBrain</button>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost mr-5 text-xl normal-case"
      >{$playerConnectionDataState?.playerName}</button
    >
    <button on:click={disconnect} class="btn btn-error btn-outline"
      >Desconectar</button
    >
  </div>
</div>
