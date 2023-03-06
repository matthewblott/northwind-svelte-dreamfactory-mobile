<script lang="ts">
	import TextField from '$lib/components/TextField.svelte'
	import { createForm } from 'felte'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema } from '@felte/validator-zod'
	import { UserSchema } from '$lib/schema/user'
	import { goto } from '$app/navigation'
	import { Auth } from '$lib/auth'
	import type User from '$lib/schema/user'
	import PasswordField from '$lib/components/PasswordField.svelte'

	const { form } = createForm<User>({
		async onSubmit(values) {
			const email = values.email
			const password = values.password
			const isLoggedIn = await Auth.login(email, password)

			if (isLoggedIn) {
				goto('/')
			}
		},
		validate: validateSchema(UserSchema),
		extend: [reporter]
	})
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>Login</ion-title>
	</ion-toolbar>
</ion-header>

<form use:form>
	<TextField name="email" value="read_write@northwi.nd" />
	<PasswordField name="password" value="password" />
	<ion-item>
		<ion-button type="submit" size="default">Submit</ion-button>
	</ion-item>
</form>
