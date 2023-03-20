<script lang="ts">
	import type { PageData } from './$types'
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Order as api } from '$lib/data/order'
	import { OrderSchema } from '$lib/schema/order'
	import type { Order } from '$lib/schema/order'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'
	import DateField from '$lib/components/DateField.svelte'
	import Customers from '$lib/components/Customers.svelte'
	import Shippers from '$lib/components/Shippers.svelte'
	import OrderRegions from '$lib/components/OrderRegions.svelte'
	import NumberField from '$lib/components/NumberField.svelte'
	import Employees from '$lib/components/Employees.svelte'

	export let data: PageData

	const { form } = createForm<Order>({
		initialValues: data,
		async onSubmit(values) {
			const id = await api.update(values)
			const url = `/orders/${id}`
			goto(url)
		},
		validate: validateSchema(OrderSchema),
		extend: [reporter]
	})

	const back = () => {
		goto('/orders')
	}

	const remove = () => {
		//
	}

	const save = () => {
		//
	}

	// const items = () => {
	// 	goto(`/orders/${orderId}/items`)
	// }
</script>

<form use:form>
	<ItemToolbar on:back={back} on:save={save} on:remove={remove} />
	<NumberField name="OrderId" value={data.OrderId} readonly />
	<Employees name="EmployeeId" value={data.EmployeeId} />
	<DateField name="OrderDate" value={data.OrderDate} />
	<DateField name="RequiredDate" value={data.RequiredDate} />
	<DateField name="shippedDate" value={data.ShippedDate} />
	<Shippers name="ShipVia" bind:value={data.ShipVia} />
	<NumberField name="Freight" />
	<TextField name="ShipAddress" />
	<TextField name="ShipCity" />
	<OrderRegions name="ShipRegion" bind:value={data.ShipRegion} />
	<TextField name="ShipPostalCode" />
	<TextField name="ShipCountry" />
</form>
