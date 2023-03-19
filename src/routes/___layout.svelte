<script lang="ts">
	import { setupIonicBase } from 'ionic-svelte'
	import Menu from '$lib/components/Menu.svelte'
	import { IonPage } from 'ionic-svelte'
	import 'ionic-svelte/components/all'
	import '../theme/variables.css'

	setupIonicBase()

	let title = 'Menu'
</script>

<ion-app>
	<ion-content>
		<IonPage>
			<Menu contentId="main-content" />

			<div class="ion-page" id="main-content">
				<ion-header>
					<ion-toolbar>
						<ion-buttons slot="start">
							<ion-menu-button />
						</ion-buttons>
						<ion-title>{title}</ion-title>
					</ion-toolbar>
				</ion-header>
				<ion-content class="ion-padding">
					<slot />
				</ion-content>
			</div>
		</IonPage>
	</ion-content>
</ion-app>
