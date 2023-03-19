<script lang="ts">
	export let data: any

	import { createForm, getValue } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Employee as api } from '$lib/data/employee'
	import { EmployeeSchema } from '$lib/schema/employee'
	import type { Employee } from '$lib/schema/employee'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import DateField from '$lib/components/DateField.svelte'
	import EmployeeRegions from '$lib/components/EmployeeRegions.svelte'
	import Employees from '$lib/components/Employees.svelte'
	import NumberField from '$lib/components/NumberField.svelte'
	import TextAreaField from '$lib/components/TextAreaField.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'

	const { form } = createForm<Employee>({
		initialValues: data,
		async onSubmit(values) {
			const id = await api.update(values)
			const url = `/employees/${id}`
			goto(url)
		},
		validate: validateSchema(EmployeeSchema),
		extend: [reporter]
	})

	const territories = () => {
		goto(`/employees/${data.EmployeeId}/territories`)
	}

	const back = () => {
		goto('/employees')
	}

	const remove = () => {
		const id = data.EmployeeId

		api.remove(id)

		goto('/employees')
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<ItemToolbar
		on:back={back}
		on:save={save}
		on:remove={remove}
		handler1Text="Territories"
		on:handler1={territories}
	/>

	<NumberField name="EmployeeId" readonly={true} />
	<TextField name="Title" />
	<TextField name="TitleOfCourtesy" />
	<DateField name="BirthDate" value={data.BirthDate} />
	<TextField name="FirstName" />
	<TextField name="LastName" />
	<DateField name="HireDate" value={data.HireDate} />
	<TextField name="Address" />
	<TextField name="City" />
	<EmployeeRegions name="Region" value={data.Region} />
	<TextField name="PostalCode" />
	<TextField name="Country" />
	<TextField name="HomePhone" />
	<TextField name="Extension" />
	<TextField name="Photo" />
	<TextAreaField name="Notes" />
	<Employees name="ReportsTo" value={data.ReportsTo} />
	<TextField name="PhotoPath" />
</form>
