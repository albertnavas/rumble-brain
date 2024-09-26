<script lang="ts">
  import type { AdminInfo } from '../../../../@types/global'

  export let adminInfo: AdminInfo
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <button class="btn btn-ghost text-xl normal-case">rumbleBrain</button>
  </div>
  <div class="navbar-end">
    {#if !adminInfo}
      <a
        class="btn btn-outline btn-success"
        href="/login"
        data-sveltekit-preload-data="tap">Login</a
      >
    {:else}
      <a
        class="btn btn-outline btn-success"
        href="/juego/crear"
        data-sveltekit-preload-data="tap">Crear juego</a
      >
    {/if}
  </div>
</div>
