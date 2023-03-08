<script lang="ts">
	import { Customer as data } from '$lib/data/customer'
	import { onMount } from 'svelte'
	import ListItem from '$lib/components/ListItem.svelte'
	import { page } from '$app/stores'
	import DeleteButton from '$lib/components/DeleteButton.svelte'
	import CancelButton from '$lib/components/CancelButton.svelte'
	import SaveButton from '$lib/components/SaveButton.svelte'
	import ActionToolbar from '$lib/components/ActionToolbar.svelte'

	const limit = 20
	let totalLimit = limit
	let offset = 0
	$: items = []

	const generateItems = async () => {
		if (offset >= totalLimit) {
			return
		}

		const promise = await data.fetchPaged(limit, offset)

		const nextItems = promise.resource

		items = items.concat(nextItems)
		totalLimit = promise.meta.count
		offset = limit + offset
	}

	const scroll = (event: any) => {
		generateItems()
		event.target.complete()
	}

	onMount(() => {
		generateItems()
	})
	const remove = () => {
		//
	}

	const cancel = () => {
		//
	}
</script>

<ion-toolbar>
	<ActionToolbar />
	<!-- <ion-item> -->
	<!-- <SaveButton /> -->
	<!-- <DeleteButton on:click={remove} /> -->
	<!-- <CancelButton on:click={cancel} /> -->
	<!-- </ion-item> -->
</ion-toolbar>
<ion-content>
	<ion-list>
		{#each items as { CustomerId, CompanyName }}
			<ListItem href="{$page.url.pathname}/{CustomerId}" text={CompanyName} />
		{/each}
	</ion-list>
	<ion-infinite-scroll on:ionInfinite={scroll}>
		<ion-infinite-scroll-content />
	</ion-infinite-scroll>
</ion-content>
