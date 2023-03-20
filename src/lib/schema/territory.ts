import { z } from 'zod'

const TerritorySchema = z.object({
	TerritoryId: z.string(),
	TerritoryDescription: z.string().min(2).max(20),
	RegionId: z.coerce.number().positive()
})

type Territory = z.infer<typeof TerritorySchema>

export { TerritorySchema, Territory }
