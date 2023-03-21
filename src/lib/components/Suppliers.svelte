<script lang="ts">
	import { Supplier as api } from '$lib/data/supplier'
	import { onMount } from 'svelte'

	let promise: any = Promise.resolve()

	export let value: number
	export let name: string = 'Supplier'

	let items: any = []

	onMount(async () => {
		promise = await api.fetchAll()
		items = promise.resource
	})
</script>

<ion-item>
	<ion-label position="stacked">Supplier</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} {name}>
				{#each items as { SupplierId, CompanyName }}
					<ion-select-option value={SupplierId}>{CompanyName} </ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
