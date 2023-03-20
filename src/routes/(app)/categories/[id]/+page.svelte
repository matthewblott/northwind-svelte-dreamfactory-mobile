<script lang="ts">
	import type { PageData } from './$types'
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Category as api } from '$lib/data/category'
	import { CategorySchema } from '$lib/schema/category'
	import type { Category } from '$lib/schema/category'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import ItemToolbar from '$lib/components/ItemToolbar.svelte'

	export let data: PageData

	const { form } = createForm<Category>({
		initialValues: data,
		async onSubmit(values) {
			const id = await api.update(values)
			const url = `/categories/${id}`
			goto(url)
		},
		validate: validateSchema(CategorySchema),
		extend: [reporter]
	})

	const back = () => {
		goto('/categories')
	}

	const remove = () => {
		const id = data.CategoryId

		api.remove(id)

		goto('/categories')
	}

	const save = () => {
		//
	}
</script>

<form use:form>
	<ItemToolbar on:back={back} on:save={save} on:remove={remove} />
	<TextField name="CategoryId" value={data.CategoryId} />
	<TextField name="CategoryName" value={data.CategoryName} />
	<TextField name="Description" value={data.Description} />
</form>
