<script lang="ts">
	import Validation from '$lib/components/Validation.svelte'
	import { capitalCase } from 'change-case'

	export let name = ''
	export let value = ''
</script>

<ion-item>
	<ion-label position="stacked">{capitalCase(name)}</ion-label>
	<ion-input {value} {name} type="password" />
	<Validation {name} />
</ion-item>
