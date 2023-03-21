<script lang="ts">
	import Validation from '$lib/components/Validation.svelte'
	import { capitalCase } from 'change-case'

	export let name = ''
	export let checked: boolean = false
</script>

<ion-item>
	<ion-checkbox slot="start" {checked} />
	<ion-label>{capitalCase(name)}</ion-label>
	<Validation {name} />
</ion-item>
