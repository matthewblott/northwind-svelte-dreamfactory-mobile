<script lang="ts">
	import Validation from '$lib/components/Validation.svelte'
	import { capitalCase } from 'change-case'

	export let name = ''
	export let value = new Date().toJSON().slice(0, 10)
</script>

<ion-item>
	<ion-label position="stacked">{capitalCase(name)}</ion-label>
	<ion-datetime-button datetime={name} disabled="false" class="my-button" />

	<ion-modal>
		<ion-datetime id={name} presentation="date" {value} class="my-inner-button" />
	</ion-modal>

	<Validation {name} />
</ion-item>

<style>
	ion-datetime-button::part(native) {
		background: inherit;
		padding-inline: inherit;
	}
</style>
