<script lang="ts">
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import SaveButton from '$lib/components/SaveButton.svelte'
	import CancelButton from '$lib/components/CancelButton.svelte'
	import { Customer as api } from '$lib/data/customer'
	import { CustomerSchema } from '$lib/schema/customer'
	import type { Customer } from '$lib/schema/customer'
	import CustomerRegions from '$lib/components/CustomerRegions.svelte'

	const { form } = createForm<Customer>({
		async onSubmit(values) {
			delete values.CustomerId
			const id = await api.create(values)
			const url = `/customers/${id}`
			goto(url)
		},
		validate: validateSchema(CustomerSchema),
		extend: [reporter]
	})

	const cancel = () => {
		goto('/customers')
	}
</script>

<form use:form>
	<ion-item>
		<SaveButton />
		<CancelButton on:click={cancel} />
	</ion-item>

	<TextField name="CustomerId" />
	<TextField name="CompanyName" />
	<TextField name="ContactName" />
	<TextField name="ContactTitle" />
	<TextField name="Address" />
	<TextField name="City" />
	<CustomerRegions />
	<TextField name="PostalCode" />
	<TextField name="Country" />
	<TextField name="Phone" />
	<TextField name="Fax" />
</form>
