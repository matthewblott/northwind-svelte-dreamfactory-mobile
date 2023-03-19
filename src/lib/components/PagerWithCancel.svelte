<script lang="ts">
	import { XSquare } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte'

	let dispatch = createEventDispatcher()

	export let limit: number
	let offset: number
	export let count: number

	const roundedCount = (count: number, limit: number): number => {
		const roundedCount = count - (count % limit)
		return roundedCount
	}

	$: buttons = {
		first: {
			enabled: false
		},
		previous: {
			enabled: false
		},
		next: {
			enabled: true
		},
		last: {
			enabled: true
		}
	}

	const first = () => {
		offset = 0
		dispatch('next', {
			offset: offset
		})
		buttons.first.enabled = false
		buttons.previous.enabled = false
		buttons.next.enabled = true
		buttons.last.enabled = true
	}

	const previous = () => {
		offset = offset - limit
		dispatch('next', {
			offset: offset
		})
		buttons.first.enabled = offset > 0
		buttons.previous.enabled = offset > 0
		buttons.next.enabled = true
		buttons.last.enabled = true
	}

	const next = () => {
		offset = offset + limit
		dispatch('next', {
			offset: offset
		})
		buttons.first.enabled = true
		buttons.previous.enabled = true
		const rc = roundedCount(count, limit)
		buttons.next.enabled = rc > offset
		buttons.last.enabled = rc > offset
	}

	const last = () => {
		offset = roundedCount(count, limit)
		dispatch('next', {
			offset: offset
		})
		buttons.first.enabled = true
		buttons.previous.enabled = true
		buttons.next.enabled = false
		buttons.last.enabled = false
	}

	const cancel = () => {
		dispatch('cancel')
	}

	onMount(() => {
		offset = 0
		console.log(count)
	})
</script>

<ion-item>
	{#if buttons.first.enabled}
		<ion-button on:click|preventDefault={first} size="default">First</ion-button>
	{:else}
		<ion-button disabled size="default">First</ion-button>
	{/if}
	{#if buttons.previous.enabled}
		<ion-button on:click|preventDefault={previous} size="default">Previous</ion-button>
	{:else}
		<ion-button disabled size="default">Previous</ion-button>
	{/if}
	{#if buttons.next.enabled}
		<ion-button on:click|preventDefault={next} size="default">Next</ion-button>
	{:else}
		<ion-button disabled size="default">Next</ion-button>
	{/if}
	{#if buttons.last.enabled}
		<ion-button on:click|preventDefault={last} size="default">Last</ion-button>
	{:else}
		<ion-button disabled size="default">Last</ion-button>
	{/if}
	<ion-button on:click|preventDefault={cancel} size="default"><XSquare /> Cancel</ion-button>
</ion-item>
