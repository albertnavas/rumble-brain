<script lang="ts">
  import { goto } from '$app/navigation'

  const signOut = () => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo !== null) {
      const userEmail = JSON.parse(userInfo).email
      google.accounts.id.revoke(
        userEmail,
        (done: { successful: boolean; error: string }) => {
          //if (done.successful) localStorage.removeItem("userInfo")
          localStorage.removeItem('userInfo')
        },
      )
    }

    goto('/')
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="-1" class="btn btn-ghost lg:hidden" for="menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </label>

      <button class="btn btn-ghost text-xl normal-case">gooQuiz</button>

      <ul
        class="menu dropdown-content rounded-box menu-sm bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
      >
        <li><a href="/">Home</a></li>
        <li><a href="/juego">Mis Juegos</a></li>
        <li><a href="/juego/crear">Crear juego</a></li>
      </ul>
    </div>
    <div class="hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Home</a></li>
        <li><a href="/juego">Mis Juegos</a></li>
        <li><a href="/juego/crear">Crear juego</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-end">
    <button on:click={signOut} class="btn btn-error btn-outline"
      >Cerrar sessión</button
    >
  </div>
</div>

<div
  id="g_id_onload"
  data-client_id="233476362528-71aor3ju8o09sl1ivndln3o22p3shk6p.apps.googleusercontent.com"
  data-context="signin"
  data-ux_mode="popup"
  data-auto_prompt="false"
/>
