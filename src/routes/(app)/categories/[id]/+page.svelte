<script lang="ts">
	export let data: any
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Category as api } from '$lib/data/category'
	import { CategorySchema } from '$lib/schema/category'
	import type { Category } from '$lib/schema/category'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import SaveButton from '$lib/components/SaveButton.svelte'
	import CancelButton from '$lib/components/CancelButton.svelte'
	import DeleteButton from '$lib/components/DeleteButton.svelte'

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

	const remove = () => {
		const id = data.CategoryId

		api.remove(id)

		goto('/categories')
	}
	const cancel = () => {
		goto('/categories')
	}
</script>

<form use:form>
	<ion-item>
		<SaveButton />
		<DeleteButton on:click={remove} />
		<CancelButton on:click={cancel} />
	</ion-item>
	<TextField name="CategoryId" value={data.CategoryId} />
	<TextField name="CategoryName" value={data.CategoryName} />
	<TextField name="Description" value={data.Description} />
</form>
