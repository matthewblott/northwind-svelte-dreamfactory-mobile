<script lang="ts">
	import Validation from '$lib/components/Validation.svelte'
	import { capitalCase } from 'change-case'

	export let name = ''
	export let value = ''
</script>

<ion-item>
	<ion-label position="stacked">{capitalCase(name)}</ion-label>
	<ion-textarea {value} {name} rows="5" />
	<Validation {name} />
</ion-item>
