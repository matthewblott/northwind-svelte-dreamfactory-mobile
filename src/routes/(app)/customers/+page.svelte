<script lang="ts">
	import { Customer as data } from '$lib/data/customer'
	import { onMount } from 'svelte'
	import type { IonList } from '@ionic/core/components/ion-list'
	import type { IonItem } from '@ionic/core/components/ion-item'
	import type { IonLabel } from '@ionic/core/components/ion-label'
	// import { logoIonic } from 'ionicons/icons'
	import ListItem from '$lib/components/ListItem.svelte'

	const limit = 15
	let totalLimit = limit
	let offset = 0

	const generateItems = async () => {
		if (offset >= totalLimit) {
			return
		}

		const promise = await data.fetchPaged(limit, offset)
		const items = promise.resource

		totalLimit = promise.meta.count

		offset = limit + offset

		items.forEach((item: any) => {
			const list = document.querySelector('#my-list') as IonList
			const el = document.createElement('ion-item') as IonItem
			const label = document.createElement('ion-label') as IonLabel

			label.textContent = item.CompanyName
			el.appendChild(label)
			list.appendChild(el)
		})
	}

	const scroll = (event: any) => {
		generateItems()
		event.target.complete()
	}

	onMount(() => {
		generateItems()
	})
</script>

<ion-list id="my-list" />

<!-- <ion-item> -->
<!-- 	<ion-icon slot="end" icon={logoIonic} /> -->
<!-- 	<ion-label>Label with icon</ion-label> -->
<!-- </ion-item> -->

<ion-infinite-scroll on:ionInfinite={scroll}>
	<ion-infinite-scroll-content />
</ion-infinite-scroll>
