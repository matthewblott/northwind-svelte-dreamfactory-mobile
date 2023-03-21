<script lang="ts">
	import { Product as data } from '$lib/data/product'
	import { onMount } from 'svelte'
	import ListItem from '$lib/components/ListItem.svelte'
	import { page } from '$app/stores'
	import ListToolbar from '$lib/components/ListToolbar.svelte'
	import { goto } from '$app/navigation'

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

	const back = () => {
		goto('/')
	}

	const add = () => {
		goto(`${$page.url.pathname}/new`)
	}
</script>

<ListToolbar on:back={back} on:add={add} />
<ion-content>
	<ion-list>
		{#each items as { ProductId, ProductName }}
			<ListItem href="{$page.url.pathname}/{ProductId}" text={ProductName} />
		{/each}
	</ion-list>
	<ion-infinite-scroll on:ionInfinite={scroll}>
		<ion-infinite-scroll-content />
	</ion-infinite-scroll>
</ion-content>
