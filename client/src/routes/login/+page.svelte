<script lang="ts">
  import type { JwtDecoded } from '../../@types/global'

  import { goto } from '$app/navigation'
  import { adminSignIn } from '$lib/infrastructure/http/admin/adminHTTP'
  import { decode } from 'jsonwebtoken-esm'

  window.onSignIn = async (response) => {
    const signInRes = await adminSignIn(response.credential)

    if (!signInRes) {
      throw new Error('Error al iniciar sessión')
    }

    const jwtDecoded = decode(response.credential) as JwtDecoded

    if (jwtDecoded !== null) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          name: jwtDecoded.name,
          email: jwtDecoded.email,
          picture: jwtDecoded.picture,
          exp: jwtDecoded.exp,
          token: response.credential,
        }),
      )

      goto('/juego')
    }
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div class="container mx-auto">
  <div class="mx-auto mt-20 w-5/6">
    <h1 class="mb-5 text-center text-3xl font-bold">Iniciar sessión</h1>

    <div
      id="g_id_onload"
      data-client_id="233476362528-71aor3ju8o09sl1ivndln3o22p3shk6p.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="onSignIn"
      data-auto_prompt="false"
></div>

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
></div>
  </div>
</div>

<style>
  :global(.g_id_signin > div > iframe) {
    margin: 0 auto !important;
  }
</style>
