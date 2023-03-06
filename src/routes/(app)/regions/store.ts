import { writable } from 'svelte/store'
import type { Region } from '$lib/schema/region'

import { Region as data } from '$lib/data/region'
import { error } from '@sveltejs/kit'

export let store = writable<Region[]>([])

export async function fetchData(limit: number, offset: number) {
	return await data.fetchPaged(limit, offset)
}
