<script lang="ts">
	import { createForm } from 'felte'
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
	import Validation from '$lib/components/Validation.svelte'
	import NewItemToolbar from '$lib/components/NewItemToolbar.svelte'

	const { form } = createForm<Employee>({
		async onSubmit(values) {
			delete values.EmployeeId

			const id = await api.create(values)
			const url = `/employees/${id}`
			goto(url)
		},
		validate: validateSchema(EmployeeSchema),
		extend: [reporter]
	})

	const back = () => {
		goto('/employees')
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<NewItemToolbar on:back={back} on:save={save} />
	<ion-item>
		<ion-label position="stacked">Id</ion-label>
		<ion-input value="[New]" readonly />
		<input type="number" name="EmployeeId" value="0" style="display: none;" />
	</ion-item>

	<TextField name="Title" />
	<TextField name="TitleOfCourtesy" />
	<DateField name="BirthDate" />

	<TextField name="FirstName" />
	<TextField name="LastName" />

	<DateField name="HireDate" />

	<TextField name="Address" />
	<TextField name="City" />
	<EmployeeRegions name="Region" />
	<TextField name="PostalCode" />
	<TextField name="Country" />
	<TextField name="HomePhone" />
	<TextField name="Extension" />
	<TextField name="Photo" />

	<label for="Notes">Notes</label>
	<textarea name="Notes" id="Notes" rows="5" />
	<Validation name="Notes" />

	<Employees name="ReportsTo" />

	<TextField name="PhotoPath" />
</form>
