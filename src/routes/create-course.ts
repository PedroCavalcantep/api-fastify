import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from "zod"

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/courses",
		{
			schema: {
				tags: ["Courses"],
				summary: "Criar curso",
				body: z.object({
					title: z.string().min(5, "título precisa ter pelo menos 5 caracteres"),
					description: z.string().optional(),
				}),

				response: {
					201: z
						.object({
							id: z.uuid(),
						})
						.describe("curso criado com sucesso"),
					400: z
						.object({
							message: z.string(),
						})
						.describe("erro ao criar curso"),
				},
			},
		},
		async (request, reply) => {
			const courseTitle = request.body.title
			const courseDesc = request.body.description

			if (!courseTitle) {
				return reply.status(400).send({ message: "titulo obrigatório." })
			}
			const result = await db
				.insert(courses)
				.values({
					title: courseTitle,
					description: courseDesc,
				})
				.returning()
			reply.status(201).send({ id: result[0].id })
		}
	)
}
