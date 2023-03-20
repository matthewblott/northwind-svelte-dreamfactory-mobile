<script lang="ts">
	import type { PageData } from './$types'
	import { createForm, getValue } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Customer as api } from '$lib/data/customer'
	import { CustomerSchema } from '$lib/schema/customer'
	import type { Customer } from '$lib/schema/customer'
	import { goto } from '$app/navigation'
	import CustomerRegions from '$lib/components/CustomerRegions.svelte'
	import TextField from '$lib/components/TextField.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'

	export let data: PageData

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

	const back = () => {
		goto('/customers')
	}

	const remove = () => {
		const id = data.CustomerId

		api.remove(id)

		goto('/customers')
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<ItemToolbar on:back={back} on:save={save} on:remove={remove} />
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
