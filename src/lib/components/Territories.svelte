<script lang="ts">
	import { Territory as api } from '$lib/data/territory'
	import { onMount } from 'svelte'

	let promise: any = Promise.resolve()

	export let value: string
	export let name: string = 'TerritoryId'

	let items: any = []

	onMount(async () => {
		promise = await api.fetchAll()
		items = promise.resource

		document.querySelector('ion-select')?.addEventListener('ionChange', (e: any) => {
			value = e.target.value
			const el: HTMLInputElement =
				document.querySelector(`input[name="${name}"]`) ?? document.createElement('input')
			el.value = value
		})
	})
</script>

<input type="hidden" {name} {value} />

<ion-item>
	<ion-label position="stacked">Territory</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value}>
				{#each items as { TerritoryId, TerritoryDescription }}
					<ion-select-option value={TerritoryId}>{TerritoryDescription}</ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
