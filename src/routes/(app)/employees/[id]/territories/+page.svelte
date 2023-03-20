<script lang="ts">
	import { page } from '$app/stores'
	import { EmployeeTerritory as data } from '$lib/data/employee-territory'
	import { onMount } from 'svelte'
	import ListItem from '$lib/components/ListItem.svelte'
	import ListToolbar from '$lib/components/ListToolbar.svelte'
	import { goto } from '$app/navigation'

	const pathname = $page.url.pathname
	const paths = pathname.split('/').filter((item) => item !== '')
	const employeeId = parseInt(paths[1])
	const limit = 20

	let totalLimit = limit
	let offset = 0

	$: items = []

	const generateItems = async () => {
		if (offset >= totalLimit) {
			return
		}

		const filter = `EmployeeId=${employeeId}`

		const promise = await data.fetchFilteredPaged(limit, offset, filter)

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
		goto(`/employees/${employeeId}`)
	}

	const add = () => {
		goto(`${$page.url.pathname}/new`)
	}
</script>

<ListToolbar on:back={back} on:add={add} />
<ion-content>
	<ion-list>
		{#each items as { EmployeeId, TerritoryId, TerritoryDescription }}
			<ListItem href="{$page.url.pathname}/{TerritoryId}" text={TerritoryDescription} />
		{/each}
	</ion-list>
	<ion-infinite-scroll on:ionInfinite={scroll}>
		<ion-infinite-scroll-content />
	</ion-infinite-scroll>
</ion-content>
