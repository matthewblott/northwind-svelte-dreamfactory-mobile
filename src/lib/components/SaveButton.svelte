<script lang="ts">
	import { Save } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'

	let dispatch = createEventDispatcher()
	const click = () => {
		dispatch('click')
		const button: any = document.querySelector('#submit')
		button.click()
	}
</script>

<button style="display: hidden;" id="submit" type="submit" />
<ion-button on:click|preventDefault={click} size="default"
	><Save />
	Save
</ion-button>
