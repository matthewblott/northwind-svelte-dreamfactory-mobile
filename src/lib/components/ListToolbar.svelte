<script lang="ts">
	import { addCircle, chevronBack } from 'ionicons/icons'

	import { createEventDispatcher } from 'svelte'

	let dispatch = createEventDispatcher()

	const back = () => {
		dispatch('back')
	}

	const add = () => {
		dispatch('add')
	}

	const keydown = () => {
		//
	}
</script>

<ion-toolbar>
	<ion-buttons slot="secondary">
		<ion-button on:click|preventDefault={back} on:keydown={keydown}>
			<ion-icon slot="start" icon={chevronBack} />
			Back
		</ion-button>
	</ion-buttons>
	<ion-buttons slot="primary">
		<ion-button on:click|preventDefault={add} on:keydown={keydown}>
			New
			<ion-icon slot="end" icon={addCircle} />
		</ion-button>
	</ion-buttons>
</ion-toolbar>
