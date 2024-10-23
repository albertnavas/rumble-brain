<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-center text-4xl font-bold">{$page.error?.message}</h1>
	<button
		class="mt-7 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		onclick={() => goto('/')}>Go Home</button
	>
</div>
