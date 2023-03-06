<script lang="ts">
	import { SafeArea } from 'capacitor-plugin-safe-area'
	import { onMount } from 'svelte'
	import { IonPage } from 'ionic-svelte'
	import { setupIonicBase } from 'ionic-svelte'

	setupIonicBase()

	/* Import all components - or do partial loading - see below */
	import 'ionic-svelte/components/all'

	import '../theme/variables.css'

	let title = 'Home'

	$: height = 0

	onMount(() => {
		SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
			height = statusBarHeight
		})
	})
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div style="height: {height}px" />
<a href="/" style="text-decoration: none;">home</a>

<ion-app>
	<ion-content>
		<IonPage>
			<slot />
		</IonPage>
	</ion-content>
</ion-app>
