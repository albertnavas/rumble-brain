<script lang="ts">
	import { playerConnectionDataState, playersState } from '$lib/store'
	import { fly } from 'svelte/transition'
</script>

<svelte:head>
	<title>Sala de espera</title>
</svelte:head>

<div class="mx-auto w-5/6">
	<div class="card-body items-center text-center">
		<div in:fly={{ x: '-100%', duration: 500 }}>
			<h1 class="mb-5">Esperando jugadores...</h1>
			<span class="loading loading-ring loading-lg"></span>
			<div class="divider w-full">Jugadores</div>
			<div class="mx-auto w-4/6">
				{#if $playersState && $playersState.length > 0}
					{#each $playersState as player}
						{#if player === $playerConnectionDataState?.playerName}
							<div class="badge badge-success ml-2 mr-2">{player}</div>
						{:else}
							<div class="badge badge-outline ml-2 mr-2">{player}</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
