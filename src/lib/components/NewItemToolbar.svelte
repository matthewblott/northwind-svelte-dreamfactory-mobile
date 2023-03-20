<script lang="ts">
	import { save, chevronBack } from 'ionicons/icons'

	import { createEventDispatcher } from 'svelte'

	let dispatch = createEventDispatcher()

	const back = () => {
		dispatch('back')
	}

	const submit = () => {
		dispatch('save')
		const button: HTMLButtonElement = document.querySelector('#submit')
		button.click()
	}

	const keydown = () => {
		//
	}
</script>

<button style="display: none;" id="submit" />
<ion-toolbar>
	<ion-buttons slot="secondary">
		<ion-button on:click|preventDefault={back} on:keydown={keydown}>
			<ion-icon slot="start" icon={chevronBack} />
			Back
		</ion-button>
	</ion-buttons>
	<ion-buttons slot="primary">
		<ion-button on:click|preventDefault={submit} on:keydown={keydown}>
			Save
			<ion-icon slot="end" icon={save} />
		</ion-button>
	</ion-buttons>
</ion-toolbar>
