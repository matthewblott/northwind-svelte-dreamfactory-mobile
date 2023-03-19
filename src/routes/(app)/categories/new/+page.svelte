<script lang="ts">
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { Category as api } from '$lib/data/category'
	import { CategorySchema } from '$lib/schema/category'
	import type { Category } from '$lib/schema/category'
	import { goto } from '$app/navigation'
	import TextField from '$lib/components/TextField.svelte'
	import NewItemToolbar from '$lib/components/NewItemToolbar.svelte'

	const { form } = createForm<Category>({
		async onSubmit(values) {
			delete values.CategoryId

			const id = await api.create(values)
			const url = `/categories/${id}`
			goto(url)
		},
		validate: validateSchema(CategorySchema),
		extend: [reporter]
	})

	const back = () => {
		goto('/categories')
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
		<input type="number" name="CategoryId" value="0" style="display: none;" />
	</ion-item>

	<TextField name="CategoryName" />
	<TextField name="Description" />
</form>
