<script lang="ts">
	export let data: any
	import { createForm, getValue } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Save, Delete, XSquare } from 'lucide-svelte'
	import { Customer as api } from '$lib/data/customer'
	import { CustomerSchema } from '$lib/schema/customer'
	import type { Customer } from '$lib/schema/customer'
	import { goto } from '$app/navigation'
	import CustomerRegions from '$lib/components/CustomerRegions.svelte'
	import Validation from '$lib/components/Validation.svelte'
	import TextField from '$lib/components/TextField.svelte'
	import SaveButton from '$lib/components/SaveButton.svelte'
	import CancelButton from '$lib/components/CancelButton.svelte'
	import DeleteButton from '$lib/components/DeleteButton.svelte'

	const { form } = createForm<Customer>({
		initialValues: data,
		async onSubmit(values) {
			const id = await api.update(values)
			const url = `/customers/${id}`
			goto(url)
		},
		validate: validateSchema(CustomerSchema),
		extend: [reporter]
	})

	let region = getValue(data, 'Region')

	const save = (e: any) => {
		const target = e.target
		const form: HTMLFormElement = target.closest('form')
		const button: any = form.querySelector('button[type="submit"]')
		button.click()
	}

	const remove = (e: any) => {
		const target = e.target
		const form: HTMLFormElement = target.closest('form')
		const idElement: any = form.querySelector('#CustomerId')
		const value = idElement.value
		const id = value

		api.remove(id)

		goto('/customers')
	}
	const cancel = () => {
		goto('/customers')
	}
</script>

<form use:form>
	<ion-item>
		<SaveButton />
		<DeleteButton on:click={remove} />
		<CancelButton on:click={cancel} />
	</ion-item>
	<ion-item>
		<ion-label position="stacked">Id</ion-label>
		<ion-input name="CustomerId" value={data.CustomerId} readonly />
	</ion-item>

	<TextField name="CompanyName" value={data.CompanyName} />
	<TextField name="ContactName" value={data.ContactName} />
	<TextField name="ContactTitle" value={data.ContactTitle} />
	<TextField name="Address" value={data.Address} />
	<TextField name="City" value={data} />
	<CustomerRegions value={region} />
	<TextField name="PostalCode" value={data.PostalCode} />
	<TextField name="Country" value={data.Country} />
	<TextField name="Phone" value={data.Phone} />
	<TextField name="Fax" value={data.Fax} />
</form>
