<script lang="ts">
	import { Edit, PlusSquare, XSquare } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { fetchData } from './store'
	import type { PageData } from './$types'
	import PagerWithCancel from '$lib/components/PagerWithCancel.svelte'
	import { page } from '$app/stores'

	const pathname = $page.url.pathname
	const paths = pathname.split('/').filter((item) => item !== '')
	const employeeId = parseInt(paths[1])

	export let data: PageData

	$: promise = data
	$: count = promise.meta.count

	const next = async (args: any) => {
		const offset = args.detail.offset
		const limit = 10
		const url = `/employees/${employeeId}/territories?limit=${limit}&offset=${offset}`

		goto(url)

		promise = await fetchData(limit, offset)
		count = promise.meta.count
	}

	const cancel = () => {
		goto(`/employees/${employeeId}`)
	}
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>Territories</ion-title>
	</ion-toolbar>
</ion-header>
<PagerWithCancel limit={10} {count} on:next={next} on:cancel={cancel} />

{#await promise}
	<p>waiting for the promise to resolve...</p>
{:then value}
	<ion-list>
		<ion-item>
			<a href="/territories/new"><PlusSquare /></a> New
		</ion-item>
		{#each value.resource as { EmployeeId, TerritoryId, TerritoryDescription }}
			<ion-item>
				<a href="/employees/{EmployeeId}/territories/{TerritoryId}"><Edit /></a>
				{TerritoryDescription}
			</ion-item>
		{/each}
	</ion-list>
{:catch error}
	{error}
{/await}
