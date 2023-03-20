<script lang="ts">
	import { Shipper as api } from '$lib/data/shipper'
	import { onMount } from 'svelte'

	let promise: any = Promise.resolve()

	export let value: number
	export let name: string = 'Shipper'

	let items: any = []

	onMount(async () => {
		promise = await api.fetchAll()
		items = promise.resource

		document.querySelector(`ion-select.${name}`)?.addEventListener('ionChange', (e: any) => {
			value = e.target.value
			const el: HTMLInputElement =
				document.querySelector(`input[name="${name}"]`) ?? document.createElement('input')
			el.value = value
		})
	})
</script>

<input type="hidden" {name} {value} />
<ion-item>
	<ion-label position="stacked">Shipper</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} class={name}>
				{#each items as { ShipperId, CompanyName }}
					<ion-select-option value={ShipperId}>{CompanyName}</ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
