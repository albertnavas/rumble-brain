<script>
	import '@fontsource/chakra-petch'
	import '../app.css'
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

{@render children?.()}

<style>
	:global(body) {
		font-family: "Chakra Petch", sans-serif;
	}
</style>
