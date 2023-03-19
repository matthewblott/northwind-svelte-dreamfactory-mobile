<script lang="ts">
	import { save, removeCircle, chevronBack } from 'ionicons/icons'
	export let handler1Text = ''

	import { createEventDispatcher } from 'svelte'

	let dispatch = createEventDispatcher()

	const back = () => {
		dispatch('back')
	}

	const handler1 = () => {
		dispatch('handler1')
	}

	const submit = () => {
		dispatch('save')
		const button: any = document.querySelector('#submit')
		button.click()
	}

	const remove = () => {
		dispatch('remove')
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
		<ion-button on:click|preventDefault={handler1} on:keydown={keydown}> {handler1Text}</ion-button>
		<ion-button on:click|preventDefault={submit} on:keydown={keydown}>
			Save
			<ion-icon slot="end" icon={save} />
		</ion-button>
		<ion-button on:click|preventDefault={remove} on:keydown={keydown}>
			Delete
			<ion-icon slot="end" icon={removeCircle} />
		</ion-button>
	</ion-buttons>
</ion-toolbar>
