import { navigating } from '$app/stores'
import { EmployeeTerritory as data } from '$lib/data/employee-territory'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = (async ({ params }) => {
	const limit = 10
	const offset = 0
	const employeeId = parseInt(params.id)
	const filter = `EmployeeId=${employeeId}`
	const items = await data.fetchFilteredPaged(limit, offset, filter)

	if (items) {
		return items
	}
	throw error(404, 'Not found')
}) satisfies PageLoad
