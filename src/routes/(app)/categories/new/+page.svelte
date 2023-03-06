<script lang="ts">
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

	const cancel = () => {
		goto('/categories')
	}
</script>

<form use:form>
	<ion-item>
		<SaveButton />
		<CancelButton on:click={cancel} />
	</ion-item>

	<ion-item>
		<ion-label position="stacked">Id</ion-label>
		<ion-input value="[New]" readonly />
		<input type="number" name="CategoryId" value="0" style="display: none;" />
	</ion-item>

	<TextField name="CategoryName" />
	<TextField name="Description" />
</form>
