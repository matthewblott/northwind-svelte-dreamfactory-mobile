<script lang="ts">
	import { Order as data } from '$lib/data/order'
	import { onMount } from 'svelte'

	let list: any

	const limit = 15
	let totalLimit = limit

	let offset = 0

	const generateItems = async () => {
		const count = list.childElementCount + 1

		if (count === totalLimit + 1) {
			return
		}

		const promise = await data.fetchPaged(limit, offset)
		const items = promise.resource

		totalLimit = promise.meta.count

		offset = limit + offset

		items.forEach((item: any) => {
			const el = document.createElement('ion-item')

			const text = document.createElement('ion-label')

			text.textContent = `# ${item.OrderId}`

			el.appendChild(text)

			list.appendChild(el)
		})
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

<ion-infinite-scroll on:ionInfinite={scroll}>
	<ion-infinite-scroll-content />
</ion-infinite-scroll>
