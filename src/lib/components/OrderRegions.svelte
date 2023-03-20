<script lang="ts">
	import { Order as api } from '$lib/data/order'
	import { onMount } from 'svelte'
	import { capitalCase } from 'change-case'

	let promise: any = Promise.resolve()

	export let value: number
	export let name: string

	let items: any = []

	onMount(async () => {
		promise = await api.fetchRegions()
		items = promise.resource

		document.querySelector(`ion-select.${name}`)?.addEventListener('ionChange', (e: any) => {
			value = e.target.value
			const el: HTMLInputElement =
				document.querySelector(`input[name="${name}"]`) ?? document.createElement('input')
			el.value = value
		})
	})
</script>

<input type="number" {name} {value} style="display: none;" />
<ion-item>
	<ion-label position="stacked">{capitalCase(name)}</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} class={name}>
				{#each items as { ShipRegion }}
					<ion-select-option value={ShipRegion}>{ShipRegion}</ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
