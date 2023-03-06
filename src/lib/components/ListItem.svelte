<script lang="ts">
	import { logoIonic } from 'ionicons/icons'
	export let text = ''
</script>

<ion-item>
	<ion-icon slot="end" icon={logoIonic} />
	<ion-label>{text}</ion-label>
</ion-item>
