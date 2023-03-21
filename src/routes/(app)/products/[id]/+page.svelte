<script lang="ts">
	import type { PageData } from './$types'
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { goto } from '$app/navigation'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'
	import { Product as api } from '$lib/data/product'
	import { ProductSchema } from '$lib/schema/product'
	import type { Product } from '$lib/schema/product'
	import Categories from '$lib/components/Categories.svelte'
	import Suppliers from '$lib/components/Suppliers.svelte'
	import NumberField from '$lib/components/NumberField.svelte'
	import TextField from '$lib/components/TextField.svelte'
	import CheckboxField from '$lib/components/CheckboxField.svelte'

	export let data: PageData

	const { form } = createForm<Product>({
		initialValues: data,
		async onSubmit(values) {
			const id = await api.update(values)
			const url = `/products/${id}`
			goto(url)
		},
		validate: validateSchema(ProductSchema),
		extend: [reporter]
	})

	const back = () => {
		goto('/products')
	}

	const remove = () => {
		const id = data.ProductId

		api.remove(id)

		goto('/products')
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<ItemToolbar on:back={back} on:save={save} on:remove={remove} />

	<NumberField name="ProductId" readonly />
	<TextField name="ProductName" />
	<Categories name="CategoryId" value={data.CategoryId} />
	<Suppliers name="SupplierId" value={data.SupplierId} />
	<TextField name="QuantityPerUnit" />
	<NumberField name="UnitPrice" />
	<NumberField name="UnitsInStock" />
	<NumberField name="UnitsOnOrder" />
	<NumberField name="ReorderLevel" />
	<CheckboxField name="Discontinued" checked={Boolean(data.Discontinued)} />
</form>
