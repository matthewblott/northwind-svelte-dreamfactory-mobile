<script lang="ts">
	import { Category as api } from '$lib/data/category'
	import { onMount } from 'svelte'

	let promise: any = Promise.resolve()

	export let value: number
	export let name: string = 'Category'

	let items: any = []

	onMount(async () => {
		promise = await api.fetchAll()
		items = promise.resource
	})
</script>

<ion-item>
	<ion-label position="stacked">Category</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} {name}>
				{#each items as { CategoryId, CategoryName }}
					<ion-select-option value={CategoryId}>{CategoryName} </ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
