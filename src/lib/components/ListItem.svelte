<script lang="ts">
	import { Edit } from 'lucide-svelte'
	export let text = ''
	export let href = ''
</script>

<ion-item>
	<ion-label slot="end">
		<a {href}><Edit /></a>
	</ion-label>
	<ion-label>{text}</ion-label>
</ion-item>
