<script lang="ts">
	import type { PageData } from './$types'
	import { createForm } from 'felte'
	import { EmployeeTerritory as api } from '$lib/data/employee-territory'
	import type { EmployeeTerritory } from '$lib/schema/employee-territory'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'
	import { page } from '$app/stores'
	import NumberField from '$lib/components/NumberField.svelte'

	const pathname = $page.url.pathname
	const paths = pathname.split('/').filter((item) => item !== '')
	const employeeId = parseInt(paths[1])

	export let data: PageData

	const { form } = createForm<EmployeeTerritory>({
		initialValues: data
	})

	const back = () => {
		goto(`/employees/${employeeId}/territories`)
	}

	const remove = () => {
		const territoryId = data.TerritoryId

		api.remove(employeeId, territoryId)

		goto(`/employees/${employeeId}/territories`)
	}
</script>

<form use:form>
	<ItemToolbar on:back={back} on:remove={remove} />
	<NumberField name="territoryId" value={data.TerritoryId} />
	<TextField name="TerritoryDescription" value={data.TerritoryDescription} />
</form>
