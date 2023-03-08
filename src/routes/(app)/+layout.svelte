<script lang="ts">
	import Logout from '$lib/components/Logout.svelte'

	export let contentId = 'main-content'

	let title = 'Home'

	const menuClick = (e: any) => {
		const target = e.target

		if (target.tagName === 'A') {
			const menu = target.closest('ion-menu')
			title = target.innerText
			menu.close()
		}
	}

	const menuKeydown = () => {
		//
	}
</script>

<ion-menu content-id={contentId}>
	<ion-header>
		<ion-toolbar>
			<ion-title>Menu Content</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<ion-list on:click={menuClick} on:keydown={menuKeydown}>
			<ion-item>
				<a href="/">Home</a>
			</ion-item>
			<ion-item>
				<a href="/categories">Categories</a>
			</ion-item>
			<ion-item>
				<a href="/customers">Customers</a>
			</ion-item>
			<ion-item>
				<a href="/employees">Employees</a>
			</ion-item>
			<ion-item>
				<a href="/orders">Orders</a>
			</ion-item>
			<ion-item>
				<a href="/products">Products</a>
			</ion-item>
			<ion-item>
				<a href="/regions">Regions</a>
			</ion-item>
			<ion-item>
				<a href="/shippers">Shippers</a>
			</ion-item>
			<ion-item>
				<a href="/suppliers">Suppliers</a>
			</ion-item>
			<ion-item>
				<a href="/territories">Territories</a>
			</ion-item>
			<ion-item>
				<Logout />
			</ion-item>
		</ion-list>
	</ion-content>
</ion-menu>

<div class="ion-page" id="main-content">
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-title>{title}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<slot />
	</ion-content>
</div>
