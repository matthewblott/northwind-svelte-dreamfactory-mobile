<script lang="ts">
	import { Edit, PlusSquare } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { fetchData } from './store'
	import type { PageData } from './$types'
	import Pager from '$lib/components/Pager.svelte'

	export let data: PageData

	$: promise = data
	$: count = promise.meta.count

	const next = async (args: any) => {
		const offset = args.detail.offset
		const limit = 10
		const url = `?limit=${limit}&offset=${offset}`

		goto(url)

		promise = await fetchData(limit, offset)
		count = promise.meta.count
	}
</script>

<Pager limit={10} {count} on:next={next} />

{#await promise}
	<p>waiting for the promise to resolve...</p>
{:then value}
	<ion-list>
		<ion-item>
			<a href="/shippers/new"><PlusSquare /></a> New
		</ion-item>
		{#each value.resource as { ShipperId, CompanyName }}
			<ion-item>
				<a href="/shippers/{ShipperId}"><Edit /></a>
				{CompanyName}
			</ion-item>
		{/each}
	</ion-list>
{:catch error}
	{error}
{/await}
