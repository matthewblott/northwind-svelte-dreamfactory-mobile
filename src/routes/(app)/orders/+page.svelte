<script lang="ts">
	import { Order as data } from '$lib/data/order'
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
	{#each items as { OrderId, OrderDate }}
		<ListItem href="{$page.url.pathname}/{OrderId}" text={OrderDate} />
	{/each}
</ion-list>
<ion-infinite-scroll on:ionInfinite={scroll}>
	<ion-infinite-scroll-content />
</ion-infinite-scroll>
