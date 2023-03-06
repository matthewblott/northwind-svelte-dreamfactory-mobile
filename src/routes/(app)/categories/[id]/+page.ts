import { Category as data } from '$lib/data/category'
import type { Category } from '$lib/schema/category'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
	const item = await data.fetchById(parseInt(params.id))

	if (item) {
		return item
	}
	throw error(404, 'Not found')
}
