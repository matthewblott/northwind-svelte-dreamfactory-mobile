<script lang="ts">
	import { Shipper as data } from '$lib/data/shipper'
	import { onMount } from 'svelte'
	import ListItem from '$lib/components/ListItem.svelte'
	import { page } from '$app/stores'

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
</script>

<ion-list>
	{#each items as { ShipperId, CompanyName }}
		<ListItem href="{$page.url.pathname}/{ShipperId}" text={CompanyName} />
	{/each}
</ion-list>
<ion-infinite-scroll on:ionInfinite={scroll}>
	<ion-infinite-scroll-content />
</ion-infinite-scroll>
