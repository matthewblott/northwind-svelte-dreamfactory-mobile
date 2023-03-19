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
	<ion-datetime-button datetime={name} />

	<ion-modal>
		<ion-datetime id={name} presentation="date" {value} />
	</ion-modal>

	<Validation {name} />
</ion-item>
