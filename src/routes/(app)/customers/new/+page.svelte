<script lang="ts">
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import { Customer as api } from '$lib/data/customer'
	import { CustomerSchema } from '$lib/schema/customer'
	import type { Customer } from '$lib/schema/customer'
	import CustomerRegions from '$lib/components/CustomerRegions.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'

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
	<ItemToolbar />

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
