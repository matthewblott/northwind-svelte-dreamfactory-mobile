<script lang="ts">
	// import { Edit, PlusSquare } from 'lucide-svelte'
	// import type { Employee } from '$lib/schema/employee'
	import { Employee as data } from '$lib/data/employee'
	import { onMount } from 'svelte'

	let list: any
	let promise: any = Promise.resolve()

	const totalLimit = 300

	const generateItems = async () => {
		const count = list.childElementCount + 1

		if (count === totalLimit + 1) {
			return
		}

		const offset = 0
		const limit = 10

		promise = await data.fetchPaged(limit, offset)

		// 	count = promise.meta.count
		const total = count + 50

		for (let i = count; i < total; i++) {
			const el = document.createElement('ion-item')

			const text = document.createElement('ion-label')

			text.textContent = `Item ${i}`

			el.appendChild(text)

			list.appendChild(el)
		}
	}

	const scroll = (event: any) => {
		generateItems()
		event.target.complete()
	}

	onMount(() => {
		list = document.querySelector('#my-list')

		generateItems()
	})
</script>

<ion-list id="my-list" />

<!-- {#each value.resource as { EmployeeId, FirstName, LastName }} -->
<!-- 		<a href="/employees/{EmployeeId}"><Edit /></a> -->
<!-- 		{FirstName} -->
<!-- 		{LastName} -->
<!-- {/each} -->

<ion-infinite-scroll on:ionInfinite={scroll}>
	<ion-infinite-scroll-content />
</ion-infinite-scroll>
