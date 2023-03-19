<script lang="ts">
	import { XSquare } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'

	let dispatch = createEventDispatcher()

	const click = () => {
		dispatch('click')
	}
</script>

<ion-button on:click|preventDefault={click} size="default"><XSquare /> Cancel</ion-button>
