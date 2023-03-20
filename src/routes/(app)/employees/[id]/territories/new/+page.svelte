<script lang="ts">
	import Territories from '$lib/components/Territories.svelte'
	import { EmployeeTerritorySchema } from '$lib/schema/employee-territory'
	import type { EmployeeTerritory } from '$lib/schema/employee-territory'
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { EmployeeTerritory as api } from '$lib/data/employee-territory'
	import { goto } from '$app/navigation'
	import NewItemToolbar from '$lib/components/NewItemToolbar.svelte'
	import { page } from '$app/stores'

	const pathname = $page.url.pathname
	const paths = pathname.split('/').filter((item) => item !== '')
	const employeeId = parseInt(paths[1])

	const { form, data } = createForm<EmployeeTerritory>({
		async onSubmit(values) {
			const id = await api.create(values)
			const url = `/employees/${employeeId}/territories/${id}`
			goto(url)
		},
		validate: validateSchema(EmployeeTerritorySchema),
		extend: [reporter]
	})

	const back = () => {
		goto(`/employees/${employeeId}/territories`)
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<NewItemToolbar on:back={back} on:save={save} />
	<ion-item>
		<ion-label position="stacked">Territory Id</ion-label>
		<ion-input value="[New]" readonly />
		<input type="number" name="EmployeeId" value={employeeId} style="display: none;" />
	</ion-item>

	<Territories bind:value={$data.TerritoryId} />
</form>
