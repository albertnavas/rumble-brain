<script lang="ts">
	import AdminGameNav from './components/AdminGameNav.svelte'
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<AdminGameNav />

<div class="container mx-auto">
	{@render children?.()}
</div>
