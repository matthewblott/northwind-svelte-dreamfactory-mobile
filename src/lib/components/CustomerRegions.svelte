<script lang="ts">
	import { Customer } from '$lib/data/customer'
	import { onMount } from 'svelte'
	let promise: any = Promise.resolve()

	export let value: string = ''
	export let name: string = 'Region'

	let items: any = []

	onMount(async () => {
		promise = await Customer.fetchRegions()
		items = promise.resource
	})
</script>

<ion-item>
	<ion-label position="stacked">Region</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} {name}>
				{#each items as { Region }}
					<ion-select-option value={Region}>{Region}</ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
