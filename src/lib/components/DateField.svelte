<script lang="ts">
	import Validation from '$lib/components/Validation.svelte'
	import { capitalCase } from 'change-case'

	export let name = ''
	export let value = new Date().toJSON().slice(0, 10)

	const fix = (e: any) => {
		value = e.target.value || value
	}
</script>

<ion-item>
	<ion-label position="stacked">{capitalCase(name)}</ion-label>
	<ion-datetime-button datetime="datetime" />

	<ion-modal>
		<ion-datetime id="datetime" presentation="date" {value} />
	</ion-modal>

	<Validation {name} />
</ion-item>
