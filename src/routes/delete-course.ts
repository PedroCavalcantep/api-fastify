import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from "zod"
import { eq } from "drizzle-orm"

export const deleteCourseRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/course/:id",
		{
			schema: {
				tags: ["Courses"],
				summary: "Deletar curso por id",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z
						.object({
							message: z.string(),
							course: z.object({
								id: z.uuid(),
								title: z.string(),
							}),
						})
						.describe("Curso deletado com sucesso"),
					404: z
						.object({
							message: z.string(),
						})
						.describe("curso não encontrado/deletado"),
				},
			},
		},
		async (request, reply) => {
			const courseId = request.params.id
			const result = await db.select().from(courses).where(eq(courses.id, courseId))
			if (result.length > 0) {
				await db.delete(courses).where(eq(courses.id, courseId)).returning()
				return reply.status(200).send({
					message: "usuário deletado",
					course: {
						id: result[0].id,
						title: result[0].title,
					},
				})
			}
			return reply.status(404).send({ message: "usuário não encontrado" })
		}
	)
}
