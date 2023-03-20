import { Customer as data } from '$lib/data/customer'
import type { Customer as schema } from '$lib/schema/customer'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
	const item: schema = await data.fetchById(params.id)

	if (item) {
		return item
	}
	throw error(404, 'Not found')
}) satisfies PageLoad
