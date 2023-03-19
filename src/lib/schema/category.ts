import { z } from 'zod'

const CategorySchema = z.object({
	CategoryId: z.number(),
	CategoryName: z.string().min(2).max(10),
	Description: z.string().max(20)
})

type Category = z.infer<typeof CategorySchema>

export { CategorySchema, Category }
