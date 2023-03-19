<script>
	import { ValidationMessage } from '@felte/reporter-svelte'
	export let name = ''
</script>

<ValidationMessage for={name} let:messages>
	{#each messages ?? [] as message}
		<ion-label position="stacked" color="danger">{message}</ion-label>
	{/each}
</ValidationMessage>
