<script lang="ts">
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Order as api } from '$lib/data/order'
	import { OrderSchema } from '$lib/schema/order'
	import type { Order } from '$lib/schema/order'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import NewItemToolbar from '$lib/components/NewItemToolbar.svelte'
	import DateField from '$lib/components/DateField.svelte'
	import Customers from '$lib/components/Customers.svelte'
	import Shippers from '$lib/components/Shippers.svelte'
	import OrderRegions from '$lib/components/OrderRegions.svelte'
	import NumberField from '$lib/components/NumberField.svelte'
	import Employees from '$lib/components/Employees.svelte'

	const { form } = createForm<Order>({
		async onSubmit(values) {
			delete values.OrderId
			const id = await api.create(values)
			const url = `/orders/${id}`
			goto(url)
		},
		validate: validateSchema(OrderSchema),
		extend: [reporter]
	})

	// const { form } = createForm<Category>({
	// 	async onSubmit(values) {
	// 		delete values.CategoryId
	//
	// 		const id = await api.create(values)
	// 		const url = `/categories/${id}`
	// 		goto(url)
	// 	},
	// 	validate: validateSchema(CategorySchema),
	// 	extend: [reporter]
	// })

	const back = () => {
		goto('/orders')
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
		<input type="number" name="OrderId" value="0" style="display: none;" />
	</ion-item>

	<Customers name="CustomerId" />
	<Employees name="EmployeeId" />
	<DateField name="OrderDate" />
	<DateField name="RequiredDate" />
	<DateField name="ShippedDate" />
	<Shippers name="ShipVia" />
	<NumberField name="Freight" />
	<TextField name="ShipName" />
	<TextField name="ShipAddress" />
	<TextField name="ShipCity" />
	<OrderRegions name="ShipRegion" />
	<TextField name="ShipPostalCode" />
	<TextField name="ShipCountry" />
</form>
