<script lang="ts">
	import { Employee } from '$lib/data/employee'
	import { onMount } from 'svelte'
	import { capitalCase } from 'change-case'
	import Validation from './Validation.svelte'

	let promise: any = Promise.resolve()

	export let value: number
	export let name: string = 'ReportsTo'

	let items: any = []

	onMount(async () => {
		promise = await Employee.fetchAll()
		items = promise.resource
	})
</script>

<ion-item>
	<ion-label position="stacked">Reports To</ion-label>
	{#await promise}
		<p>Loading ...</p>
	{:then}
		{#if items}
			<ion-select placeholder="Select" {value} {name}>
				{#each items as { EmployeeId, FirstName, LastName }}
					<ion-select-option value={EmployeeId}>{LastName}, {FirstName}</ion-select-option>
				{/each}
			</ion-select>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</ion-item>
